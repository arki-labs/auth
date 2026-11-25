import { AccessDenied, AuthenticationRequired, SessionNotFresh } from './boundary-failures.js';
import { AUTH_ERROR_CODES, AuthError } from './errors.js';
/** Signed in, or `auth.unauthenticated` (401). */
export function authed(ctx) {
    return ctx.principal === null ? AuthenticationRequired() : { principal: ctx.principal };
}
/** Signed in with a verified email: a guest is `auth.unauthenticated` (401), an unverified email `auth.forbidden` (403). */
export function verified(ctx) {
    if (ctx.principal === null)
        return AuthenticationRequired();
    return ctx.principal.user.emailVerified ? { principal: ctx.principal } : AccessDenied();
}
/** Signed in with the role `name`: a guest is `auth.unauthenticated` (401), a missing role `auth.forbidden` (403). */
export function role(name) {
    return (ctx) => {
        if (ctx.principal === null)
            return AuthenticationRequired();
        return ctx.principal.roles.includes(name) ? { principal: ctx.principal } : AccessDenied();
    };
}
/**
 * Signed in less than `sessions.freshFor` seconds ago: a guest is `auth.unauthenticated` (401), an
 * older session `auth.session_not_fresh` (403, with `freshFor`). A fresh sign-in on the same device
 * replaces the old session, so the caller passes on the next try. A principal from an auth without
 * `sessions.freshFor` throws `ARKI_AUTH_E001`: that is a setup bug, not a refusal.
 */
export function freshSession(ctx) {
    if (ctx.principal === null)
        return AuthenticationRequired();
    const { freshFor, session } = ctx.principal;
    if (freshFor === undefined) {
        throw new AuthError(AUTH_ERROR_CODES.invalidConfig, '[@arki/auth] `freshSession` needs `sessions.freshFor` in the auth definition.');
    }
    const age = Date.now() - session.createdAt.getTime();
    return age < freshFor * 1000 ? { principal: ctx.principal } : SessionNotFresh({ freshFor });
}
//# sourceMappingURL=steps.js.map