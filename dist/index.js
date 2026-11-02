/**
 * `@arki/auth` — the browser-safe vocabulary: `defineAuth`, `definePolicies`, the error codes, the
 * constants and the principal and definition types. No engine or Drizzle: a client bundle
 * can import it. The server builds the auth with `createAuth` from `@arki/auth/pg`.
 */
export { defineAuth } from './definition.js';
export { definePolicies } from './policies.js';
export { AUTH_ERROR_CODES, AuthError, isAuthError } from './errors.js';
export { AUTH_SECRET_MIN_LENGTH, PASSWORD_MIN_LENGTH } from './constants.js';
export { AUTH_FAILURES, AUTH_PRINCIPAL_FAILURES, AUTH_POLICY_FAILURES, isAuthBoundaryFailure, AuthenticationRequired, AccessDenied, ResourceMissing, AuthenticationRateLimited, AuthenticationUnavailable, SIGN_IN_FAILURE_REASONS, SignInRefused, resolvePrincipal, requirePrincipal, checkPrincipal, } from './boundary-failures.js';
export { authorizePolicy } from './policies.js';
export { authed, role, verified } from './steps.js';
//# sourceMappingURL=index.js.map