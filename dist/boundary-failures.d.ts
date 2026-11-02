import type { AnyPrincipal } from './principal.js';
/**
 * No valid session, expired credentials, or conflicting credentials.
 * @fix Sign in and send one credential per request.
 * @verify bun run test -- src/http.test.ts
 */
export declare const AuthenticationRequired: import("@arki/failure").FailureDefinition<"auth.unauthenticated", undefined>;
/**
 * A signed-in caller lacks the required permission or verified email.
 * @fix Verify the email or use an account with the required permission.
 * @verify bun run test -- src/steps.test.ts
 */
export declare const AccessDenied: import("@arki/failure").FailureDefinition<"auth.forbidden", undefined>;
/**
 * Missing and hidden subjects have exactly the same public refusal.
 * @fix Check the resource identifier and account access.
 * @verify bun run test -- src/http-policies.test.ts
 */
export declare const ResourceMissing: import("@arki/failure").FailureDefinition<"auth.not_found", undefined>;
/**
 * The caller must wait before another authentication attempt.
 * @fix Wait the retryAfter seconds before trying again.
 * @verify bun run test -- src/http.test.ts
 */
export declare const AuthenticationRateLimited: import("@arki/failure").FailureDefinition<"auth.rate_limited", import("better-auth").StandardSchemaV1<{
    retryAfter?: number | undefined;
}, {
    retryAfter?: number | undefined;
}>>;
/**
 * The authentication store cannot safely serve this request.
 * @fix Restore the authentication store and retry.
 * @verify bun run test -- src/pg/security/rate-limit.test.ts
 */
export declare const AuthenticationUnavailable: import("@arki/failure").FailureDefinition<"auth.unavailable", undefined>;
/** Why a sign-in was refused. The one list behind the `SignInFailure` type and the failure data. */
export declare const SIGN_IN_FAILURE_REASONS: readonly ['credentials', 'unverified', 'rateLimited', 'unknown'];
/**
 * A sign-in was refused: wrong credentials, an unverified email, or too many attempts. The reason
 * is the only detail; the server's own text never reaches the form.
 * @fix Show the reason to the person signing in: check the credentials, verify the email, or wait.
 * @verify bun run test -- src/react/sign-in-form.test.tsx
 */
export declare const SignInRefused: import("@arki/failure").FailureDefinition<"auth.sign_in_refused", import("better-auth").StandardSchemaV1<{
    reason: "credentials" | "rateLimited" | "unknown" | "unverified";
}, {
    reason: "credentials" | "rateLimited" | "unknown" | "unverified";
}>>;
/** Definitions for route.failures, errorMap and client revival. */
export declare const AUTH_FAILURES: readonly [import("@arki/failure").FailureDefinition<"auth.unauthenticated", undefined>, import("@arki/failure").FailureDefinition<"auth.forbidden", undefined>, import("@arki/failure").FailureDefinition<"auth.not_found", undefined>, import("@arki/failure").FailureDefinition<"auth.rate_limited", import("better-auth").StandardSchemaV1<{
    retryAfter?: number | undefined;
}, {
    retryAfter?: number | undefined;
}>>, import("@arki/failure").FailureDefinition<"auth.unavailable", undefined>, import("@arki/failure").FailureDefinition<"failure.unexpected_defect", undefined>];
/** The principal reader only; no second authentication engine. */
export type PrincipalSource<P extends AnyPrincipal> = {
    readonly principal: (headers: Headers) => Promise<P | null>;
};
export type PrincipalChecks = {
    readonly verified?: boolean;
    readonly role?: string;
};
/** Translate the engine's request errors once; causes stay private. */
export declare function resolvePrincipal<P extends AnyPrincipal>(auth: PrincipalSource<P>, headers: Headers): Promise<P | import("@arki/failure").Failure<"auth.forbidden", undefined> | import("@arki/failure").Failure<"auth.rate_limited", {
    retryAfter?: number | undefined;
}> | import("@arki/failure").Failure<"auth.unauthenticated", undefined> | import("@arki/failure").Failure<"auth.unavailable", undefined> | import("@arki/failure").Failure<"failure.unexpected_defect", undefined> | null>;
/** Require a principal, preserving its app-declared type. */
export declare function requirePrincipal<P extends AnyPrincipal>(principal: P | null): P | import("@arki/failure").Failure<"auth.unauthenticated", undefined>;
/** Check the existing principal without reading credentials or loading data. */
export declare function checkPrincipal<P extends AnyPrincipal>(principal: P | null, options?: PrincipalChecks): P | import("@arki/failure").Failure<"auth.forbidden", undefined> | import("@arki/failure").Failure<"auth.unauthenticated", undefined>;
/** Exact canonical predicate; callers keep their success type without widening to Failure. */
export declare function isAuthBoundaryFailure(value: unknown): value is ReturnType<(typeof AUTH_FAILURES)[number]>;
/** Required by signed-in principal guards. */
export declare const AUTH_PRINCIPAL_FAILURES: readonly [import("@arki/failure").FailureDefinition<"auth.unauthenticated", undefined>, import("@arki/failure").FailureDefinition<"auth.forbidden", undefined>];
/** Required by policy guards; missing and denied visibility use one definition. */
export declare const AUTH_POLICY_FAILURES: readonly [import("@arki/failure").FailureDefinition<"auth.unauthenticated", undefined>, import("@arki/failure").FailureDefinition<"auth.forbidden", undefined>, import("@arki/failure").FailureDefinition<"auth.not_found", undefined>];
//# sourceMappingURL=boundary-failures.d.ts.map