/**
 * Stable error codes. Boot mistakes (`E001`–`E003`, `E007`, `E009`) throw while the auth is built; `E008`
 * is a procedure whose contract does not declare its policy; the rest are request-time failures
 * that the transports turn into their wire shape.
 */
export declare const AUTH_ERROR_CODES: {
    /**
     * Unknown method, missing provider credentials, unknown `user.fields` name, bad duration.
     *
     * @fix Fix the definition or the `runtime()` bindings named in the message.
     * @verify bun run test -- src/pg/assemble.test.ts
     */
    readonly invalidConfig: 'ARKI_AUTH_E001';
    /**
     * The secret is missing or shorter than `AUTH_SECRET_MIN_LENGTH` in production.
     *
     * @fix Set `AUTH_SECRET` to a random string of at least 32 characters.
     * @verify bun run test -- src/testing/production-boot.test.ts
     */
    readonly weakSecret: 'ARKI_AUTH_E002';
    /**
     * A method sends mail and no mailer was given.
     *
     * @fix Add the `mail(...)` plugin before the auth plugin, or drop the methods that send mail.
     * @verify bun run test -- src/pg/mail.test.ts
     */
    readonly mailRequired: 'ARKI_AUTH_E003';
    /**
     * The engine's user lacks a column the definition exposes.
     *
     * @fix Add the column to the user table, or remove its name from `user.fields`.
     * @verify bun run test -- src/principal.test.ts
     */
    readonly principalShape: 'ARKI_AUTH_E004';
    /**
     * A testing helper was called while `production` is true.
     *
     * @fix Call testing helpers only from tests, never with `production: true`.
     * @verify bun run test -- src/testing/index.test.ts
     */
    readonly testingInProduction: 'ARKI_AUTH_E005';
    /**
     * The mailer failed to send an auth mail.
     *
     * @fix Check the mail transport and its keys, then ask for the mail again.
     * @verify bun run test -- src/pg/mail.test.ts
     */
    readonly mailFailed: 'ARKI_AUTH_E006';
    /**
     * A feature is on without its tables (`workspaces`).
     *
     * @fix Add the workspace tables and the two session columns, then rebuild the auth.
     * @verify bun run test -- src/pg/assemble.test.ts
     */
    readonly tableMissing: 'ARKI_AUTH_E007';
    /**
     * A procedure checks a policy its contract meta does not declare (`.meta({ policy })`). A bug.
     *
     * @fix Declare the policy in the procedure's contract meta with `.meta({ policy })`.
     * @verify bun run test -- src/orpc-policies.test.ts
     */
    readonly policyNotDeclared: 'ARKI_AUTH_E008';
    /**
     * Production with no `runtime().clientIp`. Every method creates accounts (password and
     * magic-link sign-up, a first social sign-in) or mails an address the caller picks (password
     * reset, magic link), and those requests would have no client address to count on.
     *
     * @fix Set `runtime().clientIp` to `{ header: '<the header your proxy writes>' }`, or `{ from: 'socket' }` without a proxy.
     * @verify bun run test -- src/pg/security/rate-limit.test.ts
     */
    readonly clientAddressRequired: 'ARKI_AUTH_E009';
    /**
     * `clientIp: { from: 'socket' }` in production, and the request carries no socket address
     * (`request.ip`), or an id-token sign-in came without `clientAddress`. The request is refused:
     * without an address its rate limit would be shared by every caller.
     *
     * @fix Serve through a runtime that sets `request.ip` (srvx: TanStack Start, Nitro, h3), or use `clientIp: { header }` behind a proxy. Pass `clientAddress` to `signInWithIdToken`.
     * @verify bun run test -- src/pg/security/rate-limit.test.ts
     */
    readonly socketAddressMissing: 'ARKI_AUTH_E010';
    /**
     * No principal, or a cookie and a bearer token on one request.
     *
     * @fix Sign in, and send either the cookie or the bearer token, not both.
     * @verify bun run test -- src/steps.test.ts
     */
    readonly unauthenticated: 'ARKI_AUTH_E401';
    /**
     * A `role()` or `verified` check refused the principal.
     *
     * @fix Verify the email, or give the user the required role.
     * @verify bun run test -- src/steps.test.ts
     */
    readonly forbidden: 'ARKI_AUTH_E403';
    /**
     * The rate limiter refused the request.
     *
     * @fix Wait for the `Retry-After` seconds, then try again.
     * @verify bun run test -- src/pg/sessions.test.ts
     */
    readonly rateLimited: 'ARKI_AUTH_E429';
    /**
     * The rate-limit store failed, so the request is refused rather than let through.
     *
     * @fix Bring the rate-limit store (Redis through `@arki/kv`) back up. Do not turn the limiter off.
     * @verify bun run test -- src/pg/sessions.test.ts
     */
    readonly storeUnavailable: 'ARKI_AUTH_E503';
};
export type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];
/** An auth failure with a stable code and the HTTP status it answers with. */
export declare class AuthError extends Error {
    readonly code: AuthErrorCode;
    readonly status: number;
    /** Seconds before a rate-limited (`E429`) attempt may be retried, when the limiter says. */
    readonly retryAfter: number | undefined;
    constructor(code: AuthErrorCode, message: string, options?: ErrorOptions & {
        readonly retryAfter?: number;
    });
}
export declare function isAuthError(error: unknown): error is AuthError;
//# sourceMappingURL=errors.d.ts.map