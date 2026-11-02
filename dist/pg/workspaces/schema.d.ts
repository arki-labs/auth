import type { PgColumn } from 'drizzle-orm/pg-core';
import type { AnyColumnSpec, ColumnKit } from '@arki/db/columns';
import type { AuthColumnFill } from '../../schema/column-options.js';
import type { CreateWorkspaceTablesOptions } from '../../schema/workspace-tables.js';
/**
 * Branded ids for the Better Auth organization-plugin entities (D-WS-007).
 *
 * The prefixes match Better Auth's default `generateId` (model name + `_`), so
 * these brands are HONEST against the runtime ids the plugin generates
 * (`organization_…`, `team_…`) and `…IdSchema.parse()` succeeds on them.
 *
 * Co-locating the brands, the `@arki/db/id` FK factories, and the scoping
 * kernel in this one module is deliberate: a feature table's scope column and
 * the kernel's `Scope` end up the SAME branded type, so kernel scope values flow
 * into Drizzle writes with no casts.
 */
export type { OrganizationId, TeamId } from '../../workspaces.js';
export type { CreateWorkspaceTablesOptions } from '../../schema/workspace-tables.js';
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
export declare function createWorkspaceForeignKeys(organizationIdColumn: () => PgColumn, teamIdColumn: () => PgColumn): {
    orgForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>>, `organization_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>, `organization_${string}`>;
    };
    teamForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>>, `team_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>, `team_${string}`>;
    };
};
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
export declare function createWorkspaceTables<TOrganizationId extends AnyColumnSpec<'pg'>, TMemberId extends AnyColumnSpec<'pg'>, TInvitationId extends AnyColumnSpec<'pg'>, TTeamId extends AnyColumnSpec<'pg'>, TTeamMemberId extends AnyColumnSpec<'pg'>, TFill extends AuthColumnFill>(c: ColumnKit<'pg'>, options: CreateWorkspaceTablesOptions<'pg', TOrganizationId, TMemberId, TInvitationId, TTeamId, TTeamMemberId, TFill>): {
    Organization: import("@arki/db/pg").PgTableOf<"organizations", {
        id: TOrganizationId;
        name: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        slug: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        logo: import("@arki/db/columns").ColumnSpec<"pg", "text", {
            enum: [string, ...string[]];
        }>;
        metadata: import("@arki/db/columns").ColumnSpec<"pg", "text", {
            enum: [string, ...string[]];
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Member: import("@arki/db/pg").PgTableOf<"members", {
        id: TMemberId;
        organizationId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Invitation: import("@arki/db/pg").PgTableOf<"invitations", {
        id: TInvitationId;
        organizationId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        email: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        status: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        teamId: import("@arki/db/columns").ColumnSpec<"pg", "text", {
            enum: [string, ...string[]];
        }>;
        inviterId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        expiresAt: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Team: import("@arki/db/pg").PgTableOf<"teams", {
        id: TTeamId;
        name: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        organizationId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        memberCount: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags>;
    }>;
    TeamMember: import("@arki/db/pg").PgTableOf<"team_members", {
        id: TTeamMemberId;
        teamId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        membershipKey: import("@arki/db/columns").ColumnSpec<"pg", "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"pg", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    orgForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>>, `organization_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>, `organization_${string}`>;
    };
    teamForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").SetNotNull<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>>, `team_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").PgVarcharBuilder<[string, ...string[]]>, `team_${string}`>;
    };
};
//# sourceMappingURL=schema.d.ts.map