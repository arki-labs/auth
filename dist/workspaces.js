/**
 * `@arki/auth/workspaces` — the workspace vocabulary with no database in it: roles, the active
 * workspace context, row scopes and the scope error. Runs anywhere (Node, Bun, Deno, browser).
 *
 * The workspace tables and the scoping kernel are Drizzle code and live on
 * `@arki/auth/pg/workspaces`.
 */
const ROLE_RANK = { owner: 3, admin: 2, member: 1 };
/** Numeric rank for a role (higher = more privilege). `null` ranks below member. */
export function rankRole(role) {
    return role ? ROLE_RANK[role] : 0;
}
/** `true` when `role` is at least `min` in the privilege order. */
export function roleAtLeast(role, min) {
    return rankRole(role) >= rankRole(min);
}
/** Classify a {@link Scope} into its level, throwing on the illegal shape. */
export function scopeLevel(scope) {
    if (scope.organizationId === null) {
        if (scope.teamId !== null) {
            throw new WorkspaceScopeError('A team-scoped row must also carry an organization id.');
        }
        return 'personal';
    }
    return scope.teamId === null ? 'org' : 'team';
}
/** Thrown when a workspace write/move is not permitted, or a scope is malformed. */
export class WorkspaceScopeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WorkspaceScopeError';
    }
}
//# sourceMappingURL=workspaces.js.map