import type { ReactNode } from 'react';
import type { AuthDefinition, SocialMethod } from '../definition.js';
import type { AuthClient } from './client.js';
import { SignInRefused } from '../boundary-failures.js';
/**
 * Reusable, brand-neutral sign-in form shared across every Arki app.
 *
 * Email-first, magic-link-by-default. The password field is revealed *in
 * place* (no navigation) when the user opts into password sign-in, so a
 * typed email is preserved across the transition. Which controls render is
 * driven entirely by the app's auth `definition` (the same object the server
 * boots from), so no dead buttons ever appear.
 *
 * Security: there is intentionally no pre-submit "does this email have a
 * password?" lookup — that would leak account existence (email enumeration).
 * The form only branches *after* the user submits, and surfaces generic
 * errors.
 */
/** Async actions the form delegates to (wired per-app to the auth client). */
export type SignInHandlers = {
    /** Send a magic sign-in link to `email`. Resolves on send. */
    onMagicLink: (email: string) => Promise<void | SignInRefusal>;
    /**
     * Sign in with email + password. On success the handler is responsible for
     * navigating (it typically never resolves because the page redirects).
     */
    onPasswordSignIn: (email: string, password: string) => Promise<void | SignInRefusal>;
    /** Start an OAuth flow. The browser is redirected to the provider. */
    onSocialSignIn: (provider: SocialMethod) => Promise<void | SignInRefusal> | void;
};
/** A refused sign-in, returned by a handler. The form shows the text for its `data.reason`. */
export type SignInRefusal = ReturnType<typeof SignInRefused>;
export type SignInLocalization = {
    title: string;
    /** Optional sub-title under the title. */
    description: string;
    email: string;
    emailPlaceholder: string;
    emailRequired: string;
    password: string;
    passwordPlaceholder: string;
    magicLinkAction: string;
    passwordAction: string;
    usePasswordToggle: string;
    useMagicLinkToggle: string;
    /** Prefix for social buttons, e.g. "Sign in with" + "Google". */
    signInWith: string;
    orContinueWith: string;
    forgotPassword: string;
    magicLinkSentTitle: string;
    /** `{email}` is replaced (and emphasised) with the address linked to. */
    magicLinkSentDescription: string;
    /** Lead-in before the resend countdown / link, e.g. "Didn't get it?". */
    magicLinkResendPrompt: string;
    /** `{seconds}` is replaced with the remaining cooldown, e.g. "Resend in {seconds}s". */
    magicLinkResendCountdown: string;
    /** Resend action shown once the cooldown elapses. */
    magicLinkResendAction: string;
    /** Confirmation after a successful resend. */
    magicLinkResentConfirmation: string;
    /** Lead-in before the change-email action, e.g. "Wrong email?". */
    changeEmailPrompt: string;
    /** Action that returns to the form to edit the email. */
    changeEmailAction: string;
    genericError: string;
    /** Shown when the email or password is wrong. */
    credentialsError: string;
    /** Shown when the account's email is not verified yet. */
    unverifiedError: string;
    /** Shown when too many attempts were made. */
    rateLimitedError: string;
};
type Mode = 'magic-link' | 'password';
/** What the form renders from: the app's auth definition (the same object the server boots from). */
export type SignInFormSource = {
    definition: AuthDefinition;
};
export type SignInFormProps = SignInFormSource & {
    handlers: SignInHandlers;
    localization?: Partial<SignInLocalization>;
    /** Which mode to open in. Clamped to an available mode. */
    initialMode?: Mode;
    /** Route for the "Forgot password?" link. Hidden when omitted. */
    forgotPasswordTo?: string;
    /** Replaces the default title/description header entirely. */
    header?: ReactNode;
    /** Rendered below the card body (e.g. a "Sign up" link). */
    footer?: ReactNode;
    className?: string;
};
export declare function SignInForm({ handlers, localization, initialMode, forgotPasswordTo, header, footer, className, definition, }: SignInFormProps): import("react").JSX.Element;
/**
 * The `error` of an engine sign-in call, taken from the client `createAuthClient` returns, so it
 * cannot drift from it: `null` on success, else `status` (the HTTP status) and `code` (the
 * engine's error code, such as `EMAIL_NOT_VERIFIED`). The server's `message` is not read.
 */
type EngineSignInError = Awaited<ReturnType<typeof _engineClient.signIn.email<{
    throw: false;
}>>>['error'];
/**
 * Type-only: names the engine client so its generic `email` can be instantiated. `ReturnType` of
 * the uninstantiated method is `any`, which would accept every shape and check nothing.
 */
declare const _engineClient: AuthClient<AuthDefinition>;
/** The part of a sign-in call result the adapter reads. */
type AuthClientResult = {
    readonly error: EngineSignInError;
};
/**
 * Structural subset of a better-auth client the adapter needs. Methods use
 * method syntax (not arrow properties) so parameter checking is bivariant —
 * an app's concrete client (with a narrower `provider` union and extra
 * optional args) stays assignable without `any` or unsafe casts.
 */
export type SignInCapableAuthClient = {
    signIn: {
        email(params: {
            email: string;
            password: string;
            callbackURL?: string;
        }): Promise<AuthClientResult>;
        /** Absent when the definition does not enable magic links. */
        magicLink?(params: {
            email: string;
            callbackURL?: string;
        }): Promise<AuthClientResult>;
        social(params: {
            provider: SocialMethod;
            callbackURL?: string;
        }): Promise<AuthClientResult>;
    };
};
export type SignInHandlerOptions = {
    /** Where to send the user after a successful sign-in. */
    redirectTo: string;
    /**
     * Called after a successful password sign-in. Defaults to a full-document
     * navigation to `redirectTo` so the SSR session cookie is picked up.
     */
    onSignedIn?: () => void;
};
/**
 * Wires a better-auth client to {@link SignInHandlers}. Pass the result as
 * the `handlers` prop of {@link SignInForm}.
 */
export declare function createSignInHandlers(authClient: SignInCapableAuthClient, { redirectTo, onSignedIn }: SignInHandlerOptions): SignInHandlers;
export {};
//# sourceMappingURL=sign-in-form.d.ts.map