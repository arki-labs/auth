/**
 * Principal steps: plain functions that read `ctx.principal` and either narrow it to non-null or
 * refuse the call. They import no transport, so one function serves every transport's `step()`:
 *
 * @example
 * import { authed } from '@arki/auth';
 * import { step } from '@arki/dot/orpc'; // or '@arki/http', '@arki/queue'
 * impl.profile.use(step(authed)).handler(({ context }) => context.principal.user.id);
 *
 * Each step is generic in the principal, so the handler after it keeps the app's own principal
 * type (exposed columns, branded ids), not {@link AnyPrincipal}.
 */
import type { AnyPrincipal } from './principal.js';
/** Signed in, or `auth.unauthenticated` (401). */
export declare function authed<P extends AnyPrincipal>(ctx: {
    readonly principal: P | null;
}): import("@arki/failure").Failure<"auth.unauthenticated", undefined> | {
    principal: P;
};
/** Signed in with a verified email: a guest is `auth.unauthenticated` (401), an unverified email `auth.forbidden` (403). */
export declare function verified<P extends AnyPrincipal>(ctx: {
    readonly principal: P | null;
}): import("@arki/failure").Failure<"auth.forbidden", undefined> | import("@arki/failure").Failure<"auth.unauthenticated", undefined> | {
    principal: P;
};
/** Signed in with the role `name`: a guest is `auth.unauthenticated` (401), a missing role `auth.forbidden` (403). */
export declare function role(name: string): <P extends AnyPrincipal>(ctx: {
    readonly principal: P | null;
}) => import("@arki/failure").Failure<"auth.forbidden", undefined> | import("@arki/failure").Failure<"auth.unauthenticated", undefined> | {
    principal: P;
};
//# sourceMappingURL=steps.d.ts.map