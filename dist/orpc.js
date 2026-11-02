import { orThrowRpc } from '@arki/failure/orpc';
import { AccessDenied, AuthenticationRequired, ResourceMissing } from './boundary-failures.js';
import { AUTH_ERROR_CODES, AuthError } from './errors.js';
import { authorizePolicy, groupOf, keyed } from './policies.js';
/** Missing → `auth.not_found`. For rows the query already scoped to the caller (`getOwned`). */
export function assertFound(row, errors) {
    if (row === null || row === undefined) {
        orThrowRpc(ResourceMissing(), errors);
    }
}
/** Reads: missing OR someone else's → `auth.not_found`. A stranger cannot tell the two apart. */
export function assertOwnedOrNotFound(row, actorId, errors) {
    if (row === null || row === undefined || row.userId !== actorId) {
        orThrowRpc(ResourceMissing(), errors);
    }
}
/** Mutations: missing → `auth.not_found`; someone else's → `auth.forbidden` (the caller already had the id). */
export function assertOwnedOrForbidden(row, actorId, errors) {
    assertFound(row, errors);
    if (row.userId !== actorId) {
        orThrowRpc(AccessDenied(), errors);
    }
}
/** The contract meta must name the policy `can` checks, so `dot explain` never shows a wrong one. */
function assertDeclared(meta, name) {
    const declared = meta['policy'];
    if (declared === name)
        return;
    throw new AuthError(AUTH_ERROR_CODES.policyNotDeclared, `The procedure checks policy "${name}", but its contract meta declares ${typeof declared === 'string' ? `"${declared}"` : 'none'}. Add .meta({ policy: '${name}' }) to the contract.`);
}
/**
 * Signs in, loads the subject, runs the named policy. The procedure's contract meta must name
 * the same policy (`.meta({ policy: 'order.refund' })`), so `dot explain` shows it; a missing or
 * different name is `ARKI_AUTH_E008`.
 *
 * - a guest → `auth.unauthenticated` (401); the loader does not run;
 * - no such subject, or the group's `view` refuses → `auth.not_found` (404; hidden and missing look identical);
 * - the policy refuses → `auth.forbidden` (403).
 *
 * The loader's context is the procedure's, at the `.use()` that attaches it.
 *
 * @example
 * impl.refund
 *   .use(can(orderPolicies)('order.refund', ({ id }, { usecases }) => usecases.findOrder(id)))
 *   .handler(({ context }) => context.usecases.refund(context.order));
 */
export function can(policies) {
    return (name, load) => async (options, input) => {
        assertDeclared(options.procedure['~orpc'].meta, name);
        const principal = options.context.principal;
        if (principal === null)
            return orThrowRpc(AuthenticationRequired(), options.errors);
        const subject = await authorizePolicy(policies, name, principal, await load(input, { ...options.context, principal }));
        if (AccessDenied.is(subject))
            return orThrowRpc(AccessDenied(), options.errors);
        if (ResourceMissing.is(subject))
            return orThrowRpc(ResourceMissing(), options.errors);
        return options.next({ context: { principal, ...keyed(groupOf(name), subject) } });
    };
}
//# sourceMappingURL=orpc.js.map