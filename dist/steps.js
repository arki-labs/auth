import { AccessDenied, AuthenticationRequired } from './boundary-failures.js';
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
//# sourceMappingURL=steps.js.map