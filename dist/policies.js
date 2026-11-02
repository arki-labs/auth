import { AccessDenied, ResourceMissing } from './boundary-failures.js';
import { log } from './log.js';
/**
 * Group policies by subject. The first call takes the subject types (and, optionally, the app's
 * principal when a policy reads an exposed column); the second takes the tree, whose names are
 * inferred. Two calls, because TypeScript cannot take some type arguments and infer the rest.
 */
export function definePolicies() {
    return wrapTree;
}
function wrapTree(tree) {
    return { tree };
}
/** The group of a policy name, typed: `'order'` for `'order.refund'`. */
export function groupOf(name) {
    const group = name.slice(0, Math.max(0, name.indexOf('.')));
    if (!isGroupOf(name, group))
        throw new Error(`"${name}" is not a policy name (group.action).`);
    return group;
}
/** The check that makes `groupOf` sound: `group` is exactly what comes before the first dot. */
function isGroupOf(name, group) {
    return group.length > 0 && !group.includes('.') && name.startsWith(`${group}.`);
}
/**
 * Run one named check for a signed-in principal and an already-loaded subject (`null` = missing).
 * Order: missing → `view` (when the group has one) → the action. Each refusal writes one debug
 * line with the policy name, the principal's id and the outcome. A policy that throws is rethrown.
 */
export async function decide(policies, name, principal, subject) {
    const refuse = (outcome) => {
        log.debug('Policy {policy} refused {principalId}: {outcome}', {
            policy: name,
            principalId: principal.user.id,
            outcome,
        });
        return { allowed: false, outcome };
    };
    if (subject === null)
        return refuse('missing');
    const outcome = await refusal(policies, name, principal, subject);
    return outcome === undefined ? { allowed: true, subject } : refuse(outcome);
}
async function refusal(policies, name, principal, subject) {
    const group = groupOf(name);
    const action = name.slice(group.length + 1);
    const rules = policies.tree[group];
    const args = { principal, [group]: subject };
    const view = rules?.['view'];
    if (view !== undefined && !(await view(args)))
        return 'hidden';
    if (action === 'view')
        return undefined;
    const rule = rules?.[action];
    // The types only allow names in the tree; this is reached only when the tree was changed at runtime.
    if (rule === undefined)
        throw new Error(`Policy "${name}" is not defined.`);
    return (await rule(args)) ? undefined : 'forbidden';
}
/**
 * `{ [key]: value }` with its key kept in the type. TypeScript widens a computed key to `string`;
 * the check below proves the key holds the value, so the narrowing is sound.
 */
export function keyed(key, value) {
    const entry = { [key]: value };
    if (!holds(entry, key, value))
        throw new Error(`Could not set "${key}".`);
    return entry;
}
function holds(entry, key, value) {
    return Object.hasOwn(entry, key) && Reflect.get(entry, key) === value;
}
/** A policy result as a canonical value; missing and hidden never disclose different data. */
export async function authorizePolicy(policies, name, principal, subject) {
    const decision = await decide(policies, name, principal, subject);
    if (decision.allowed)
        return decision.subject;
    return decision.outcome === 'forbidden' ? AccessDenied() : ResourceMissing();
}
//# sourceMappingURL=policies.js.map