import type { SQLiteColumn } from 'drizzle-orm/sqlite-core';
import type { AnyColumnSpec, ColumnKit } from '@arki/db/columns';
import type { AuthColumnFill } from '../../schema/column-options.js';
import type { CreateWorkspaceTablesOptions } from '../../schema/workspace-tables.js';
export type { OrganizationId, TeamId } from '../../workspaces.js';
export type { CreateWorkspaceTablesOptions } from '../../schema/workspace-tables.js';
/**
 * The workspace scope FK factories bound to an app's `Organization` / `Team` id columns, for its
 * SQLite feature tables. Same contract as on `@arki/auth/pg/workspaces`: the columns are branded
 * `OrganizationId` / `TeamId`, and `onDelete: 'cascade'` deletes a row with its workspace.
 */
export declare function createWorkspaceForeignKeys(organizationIdColumn: () => SQLiteColumn, teamIdColumn: () => SQLiteColumn): {
    orgForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm").NotNull<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>>, `organization_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>, `organization_${string}`>;
    };
    teamForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm").NotNull<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>>, `team_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>, `team_${string}`>;
    };
};
/**
 * The five tables of the Better Auth organization plugin with teams on SQLite, plus the scope FK
 * factories from `createWorkspaceForeignKeys` bound to them.
 *
 * @example
 * ```typescript
 * export const { Organization, Member, Invitation, Team, TeamMember, orgForeignKeys, teamForeignKeys } =
 *   createWorkspaceTables(sqliteColumns({ prefix: 'auth_' }), {
 *     fill: 'app',
 *     user: User,
 *     ids: { organization: organizationIdSource, member: memberIdSource, ... },
 *   });
 * ```
 */
export declare function createWorkspaceTables<TOrganizationId extends AnyColumnSpec<'sqlite'>, TMemberId extends AnyColumnSpec<'sqlite'>, TInvitationId extends AnyColumnSpec<'sqlite'>, TTeamId extends AnyColumnSpec<'sqlite'>, TTeamMemberId extends AnyColumnSpec<'sqlite'>, TFill extends AuthColumnFill>(c: ColumnKit<'sqlite'>, options: CreateWorkspaceTablesOptions<'sqlite', TOrganizationId, TMemberId, TInvitationId, TTeamId, TTeamMemberId, TFill>): {
    Organization: import("@arki/db/sqlite").SqliteTableOf<"organizations", {
        id: TOrganizationId;
        name: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        slug: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        logo: import("@arki/db/columns").ColumnSpec<"sqlite", "text", {
            enum: [string, ...string[]];
        }>;
        metadata: import("@arki/db/columns").ColumnSpec<"sqlite", "text", {
            enum: [string, ...string[]];
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Member: import("@arki/db/sqlite").SqliteTableOf<"members", {
        id: TMemberId;
        organizationId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Invitation: import("@arki/db/sqlite").SqliteTableOf<"invitations", {
        id: TInvitationId;
        organizationId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        email: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        status: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        teamId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", {
            enum: [string, ...string[]];
        }>;
        inviterId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        expiresAt: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Team: import("@arki/db/sqlite").SqliteTableOf<"teams", {
        id: TTeamId;
        name: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        organizationId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        memberCount: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags>;
    }>;
    TeamMember: import("@arki/db/sqlite").SqliteTableOf<"team_members", {
        id: TTeamMemberId;
        teamId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        membershipKey: import("@arki/db/columns").ColumnSpec<"sqlite", "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<"sqlite", "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    orgForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm").NotNull<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>>, `organization_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>, `organization_${string}`>;
    };
    teamForeignKeys: {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm").NotNull<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>>, `team_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/sqlite").OnDelete;
        }) => import("drizzle-orm").$Type<import("drizzle-orm/sqlite-core").SQLiteTextBuilder<[string, ...string[]]>, `team_${string}`>;
    };
};
//# sourceMappingURL=schema.d.ts.map