import { idColumns } from '@arki/db/id';
import { organizationId, teamId } from '../../id-declarations.js';
import { workspaceTables } from '../../schema/workspace-tables.js';
const organizationIdColumns = idColumns(organizationId);
const teamIdColumns = idColumns(teamId);
/**
 * Build the workspace scope FK factories bound to an app's `Organization` /
 * `Team` id columns (D-WS-005). Each app calls this once and uses the returned
 * factories on its scopable feature tables:
 *
 *   const { orgForeignKeys, teamForeignKeys } =
 *     createWorkspaceForeignKeys(() => Organization.id, () => Team.id);
 *   // on a feature table:
 *   organizationId: orgForeignKeys.optional('organization_id', { onDelete: 'cascade' }),
 *   teamId: teamForeignKeys.optional('team_id', { onDelete: 'cascade' }),
 *
 * The produced columns are `varchar(256)` branded `OrganizationId` / `TeamId`,
 * so they unify with the kernel's `Scope`. `onDelete: 'cascade'` implements the
 * D-WS-008 destroy-on-delete contract.
 */
export function createWorkspaceForeignKeys(organizationIdColumn, teamIdColumn) {
    return {
        orgForeignKeys: organizationIdColumns.createForeignKeyFactory(organizationIdColumn),
        teamForeignKeys: teamIdColumns.createForeignKeyFactory(teamIdColumn),
    };
}
/**
 * The five tables of the Better Auth organization plugin with teams on Postgres
 * (`organizations`, `members`, `invitations`, `teams`, `team_members`), plus
 * the scope FK factories from `createWorkspaceForeignKeys` bound to them.
 *
 * @example
 * ```typescript
 * export const { Organization, Member, Invitation, Team, TeamMember, orgForeignKeys, teamForeignKeys } =
 *   createWorkspaceTables(pgColumns(schema), {
 *     naming: 'camel',
 *     fill: 'database',
 *     user: User,
 *     ids: { organization: organizationIdSource, member: memberIdSource, ... },
 *   });
 * ```
 */
export function createWorkspaceTables(c, options) {
    const tables = workspaceTables(c, options);
    return {
        ...tables,
        ...createWorkspaceForeignKeys(() => tables.Organization.id, () => tables.Team.id),
    };
}
//# sourceMappingURL=schema.js.map