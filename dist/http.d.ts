/**
 * `@arki/auth/http` — the principal as an `@arki/http` step, and policy checks as a handler
 * wrapper. Node and Bun.
 *
 * @example
 * routes()
 *   .use(step(principalFromHeaders(auth), { failureHeaders: authFailureHeaders }))
 *   .use(step(authed, { failureHeaders: authFailureHeaders }))
 *   .bind(getProfile, (_input, ctx) => repo.byUser(ctx.principal.user.id));
 */
import type { BaseRequestCtx } from '@arki/http';
import type { AUTH_POLICY_FAILURES, PrincipalSource } from './boundary-failures.js';
import type { AnyPolicies, GroupOf, Loaded, PolicyName, PrincipalOfPolicies, SubjectOf } from './policies.js';
import type { AnyPrincipal } from './principal.js';
export type { PrincipalSource } from './boundary-failures.js';
/** Response headers for canonical auth refusals returned by a step or policy handler. */
export declare function authFailureHeaders<Value>(failure: Value): Readonly<Record<string, string>> | undefined;
/**
 * A step that reads the request's credentials: `ctx.principal` is the principal, or `null` for a
 * guest. Bad credentials, a rate limit or a store outage refuse the call. Follow it with
 * `step(authed)` (or `verified`, `role(name)`) on routes that need a signed-in caller.
 */
export declare function principalFromHeaders<P extends AnyPrincipal>(auth: PrincipalSource<P>): (ctx: {
    readonly req: Request;
}) => Promise<import("@arki/failure").Failure<"auth.forbidden", undefined> | import("@arki/failure").Failure<"auth.rate_limited", {
    retryAfter?: number | undefined;
}> | import("@arki/failure").Failure<"auth.unauthenticated", undefined> | import("@arki/failure").Failure<"auth.unavailable", undefined> | import("@arki/failure").Failure<"failure.unexpected_defect", undefined> | {
    principal: P | null;
}>;
/** The handler context after a policy check: a signed-in principal, and the subject under its group's name. */
type SignedIn<Ctx extends {
    readonly principal: unknown;
}> = Ctx & {
    readonly principal: NonNullable<Ctx['principal']>;
};
/**
 * Wrap a handler in a policy check. It runs after the input is decoded, so `load` reads the typed
 * `params` and `body`. The bundle must add `principal` first (`step(principalFromHeaders(auth))`).
 *
 * - a guest → 401 `auth.unauthenticated`; the loader does not run;
 * - no such subject, or the group's `view` refuses → 404 `auth.not_found` (it looks missing);
 * - the policy refuses → 403 `auth.forbidden`.
 *
 * @example
 * routes()
 *   .use(step(principalFromHeaders(auth), { failureHeaders: authFailureHeaders }))
 *   .bind(refundOrder, authorize(orderPolicies)('order.refund', ({ params }, ctx) => ctx.orders.byId(params.id), (_input, { order }) => refund(order)));
 */
export declare function authorize<T extends AnyPolicies>(policies: T): <N extends PolicyName<T>, I, Ctx extends BaseRequestCtx & {
    readonly principal: (AnyPrincipal & PrincipalOfPolicies<T>) | null;
}, R>(name: N, load: (input: I, ctx: SignedIn<Ctx>) => Loaded<SubjectOf<T, N>>, handler: (input: I, ctx: SignedIn<Ctx> & Readonly<Record<GroupOf<N>, SubjectOf<T, N>>>) => R | Promise<R>) => (input: I, ctx: Ctx) => Promise<R | ReturnType<(typeof AUTH_POLICY_FAILURES)[number]>>;
//# sourceMappingURL=http.d.ts.map