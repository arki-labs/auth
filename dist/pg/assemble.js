import { expo } from '@better-auth/expo';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { bearer, magicLink, oAuthProxy, organization } from 'better-auth/plugins';
import { PASSWORD_MIN_LENGTH } from '../constants.js';
import { AUTH_ERROR_CODES, AuthError, isAuthError } from '../errors.js';
import { AUTH_BASE_PATH } from './events.js';
import { LINK_MINUTES } from './mail.js';
import { CLIENT_KEY_KIND_HEADER } from './security/client-key.js';
/** The engine's model names mapped to the app's tables. */
export function engineSchema(tables) {
    const { User, Session, Account, Verification, Organization, Member, Invitation, Team, TeamMember } = tables;
    return {
        user: User,
        session: Session,
        account: Account,
        verification: Verification,
        ...(Organization && { organization: Organization }),
        ...(Member && { member: Member }),
        ...(Invitation && { invitation: Invitation }),
        ...(Team && { team: Team }),
        ...(TeamMember && { teamMember: TeamMember }),
    };
}
const originOf = (url) => new URL(url).origin;
export function engineOptions(input) {
    const { definition, runtime, callbacks } = input;
    const { methods, verifyEmail, sessions, workspaces, account } = definition;
    const { beforeUserCreate, sessionCreating } = callbacks;
    const password = methods.includes('password');
    const verifiesSignUp = password && verifyEmail !== 'none';
    // E003 is thrown before this runs whenever a method sends mail; this keeps the closures total.
    const sendLink = async (kind, to, url, request) => {
        if (input.mail === undefined)
            throw new AuthError(AUTH_ERROR_CODES.mailRequired, 'No mailer is bound.');
        await input.mail.send(kind, to, url, request);
    };
    const plugins = [
        ...(runtime.productionUrl !== undefined && originOf(runtime.productionUrl) !== originOf(runtime.url)
            ? [oAuthProxy({ currentURL: runtime.url, productionURL: runtime.productionUrl })]
            : []),
        ...(definition.expo ? [expo()] : []),
        ...(methods.includes('magicLink')
            ? [
                magicLink({
                    storeToken: 'hashed',
                    expiresIn: LINK_MINUTES.magicLink * 60,
                    disableSignUp: !definition.magicLink.signUp,
                    sendMagicLink: ({ email, url }, ctx) => sendLink('magicLink', email, url, ctx?.request),
                }),
            ]
            : []),
        ...(workspaces === undefined ? [] : [organization({ teams: { enabled: workspaces.teams } })]),
        ...(sessions.bearer ? [bearer()] : []),
        ...input.plugins,
    ];
    return {
        appName: definition.app.name,
        baseURL: runtime.url,
        basePath: AUTH_BASE_PATH,
        secret: runtime.secret,
        database: drizzleAdapter(input.db, { provider: input.provider, schema: engineSchema(input.tables) }),
        trustedOrigins: [
            originOf(runtime.url),
            ...(runtime.productionUrl === undefined ? [] : [originOf(runtime.productionUrl)]),
            ...runtime.trustedOrigins,
        ],
        socialProviders: input.socialProviders,
        plugins,
        user: {
            additionalFields: input.additionalFields,
            ...(beforeUserCreate !== undefined && {
                async validateUserInfo({ user, source }, ctx) {
                    const method = input.methodOfSource(source);
                    if (source.action !== 'create-user' || method === undefined || typeof user.email !== 'string') {
                        return;
                    }
                    try {
                        await beforeUserCreate({ email: user.email, method, request: ctx.request });
                        return;
                    }
                    catch (error) {
                        if (isAuthError(error))
                            return { error: error.code, errorDescription: error.message };
                        throw error;
                    }
                },
            }),
            // The new address gets the verify link (`emailVerification` below); it changes when the link is used.
            changeEmail: { enabled: account.changeEmail },
            // No confirmation mail: a fresh session or the password is the proof.
            deleteUser: { enabled: account.delete },
        },
        account: { accountLinking: { enabled: account.linking } },
        databaseHooks: {
            user: { create: { after: (user, ctx) => callbacks.userCreated(user, ctx?.path, ctx?.body) } },
            // Every session the engine writes goes through here: every sign-in path and `actingAs`.
            session: {
                create: {
                    before: async (session, ctx) => {
                        const columns = sessionCreating === undefined ? {} : await sessionCreating(session, ctx?.request);
                        // An account key is not where the client is: never record it as the session's address.
                        const accountKeyed = ctx?.request?.headers.get(CLIENT_KEY_KIND_HEADER) === 'account';
                        return { data: accountKeyed ? { ...columns, ipAddress: null } : columns };
                    },
                    after: session => callbacks.sessionCreated(session),
                },
            },
        },
        session: {
            additionalFields: input.sessionFields,
            expiresIn: sessions.expiresIn,
            updateAge: sessions.refreshEvery,
            storeSessionInDatabase: true,
            // Off, so a revoked session fails on the very next request.
            cookieCache: { enabled: false },
        },
        ...(password && {
            emailAndPassword: {
                enabled: true,
                minPasswordLength: PASSWORD_MIN_LENGTH,
                requireEmailVerification: verifyEmail === 'require',
                autoSignIn: verifyEmail !== 'require',
                revokeSessionsOnPasswordReset: true,
                resetPasswordTokenExpiresIn: LINK_MINUTES.resetPassword * 60,
                sendResetPassword: ({ user, url }, request) => sendLink('resetPassword', user.email, url, request),
                onPasswordReset: ({ user }) => callbacks.passwordReset(user.id),
            },
        }),
        // Change email needs the verify link too, even when sign-up sends none.
        ...((verifiesSignUp || account.changeEmail) && {
            emailVerification: {
                sendOnSignUp: verifiesSignUp,
                autoSignInAfterVerification: true,
                expiresIn: LINK_MINUTES.verifyEmail * 60,
                sendVerificationEmail: ({ user, url }, request) => sendLink('verifyEmail', user.email, url, request),
            },
        }),
        hooks: {
            // A password change always ends the other sessions: a stolen session cannot keep the account.
            before: createAuthMiddleware(async (ctx) => {
                if (ctx.path !== '/change-password')
                    return;
                const body = ctx.body;
                if (typeof body !== 'object' || body === null)
                    throw new APIError('BAD_REQUEST');
                return { context: { body: { ...body, revokeOtherSessions: true } } };
            }),
        },
        rateLimit: input.rateLimit === undefined
            ? { enabled: false }
            : input.rateLimit === 'memory'
                ? { enabled: true, storage: 'memory' }
                : { enabled: true, customStorage: input.rateLimit },
        advanced: {
            cookiePrefix: `auth-${definition.app.key}`,
            useSecureCookies: runtime.production,
            // Explicit: the engine turns both checks off whenever it thinks it runs under test.
            disableOriginCheck: false,
            disableCSRFCheck: false,
            database: { generateId: false },
            // Always named: the engine's default is the caller-set `x-forwarded-for`.
            ipAddress: { ipAddressHeaders: [runtime.clientIpHeader] },
        },
    };
}
//# sourceMappingURL=assemble.js.map