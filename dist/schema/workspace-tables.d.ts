import type { Column } from 'drizzle-orm';
import type { AnyColumnSpec, ColumnKit, Dialect } from '@arki/db/columns';
import type { AuthColumnFill, AuthColumnOptions, PrimaryColumnSource } from './column-options.js';
export type CreateWorkspaceTablesOptions<D extends Dialect, TOrganizationId extends AnyColumnSpec<D>, TMemberId extends AnyColumnSpec<D>, TInvitationId extends AnyColumnSpec<D>, TTeamId extends AnyColumnSpec<D>, TTeamMemberId extends AnyColumnSpec<D>, TFill extends AuthColumnFill> = AuthColumnOptions<TFill> & {
    /** The app's `User` table. Members, invitations and team members point at its `id`. */
    user: {
        id: Column;
    };
    /** The app's id sources, one per table, e.g. `c.id(organizationId)`. The lib never makes ids. */
    ids: {
        organization: PrimaryColumnSource<TOrganizationId>;
        member: PrimaryColumnSource<TMemberId>;
        invitation: PrimaryColumnSource<TInvitationId>;
        team: PrimaryColumnSource<TTeamId>;
        teamMember: PrimaryColumnSource<TTeamMemberId>;
    };
};
/**
 * The five tables of the Better Auth organization plugin with teams
 * (`organizations`, `members`, `invitations`, `teams`, `team_members`), written
 * once against the column kit. `createWorkspaceTables` on `@arki/auth/pg/workspaces`
 * and `@arki/auth/sqlite/workspaces` add the scope foreign key factories of
 * their dialect.
 *
 * Column keys mirror the plugin's model fields, because the Better Auth
 * Drizzle adapter maps each field to the identically-named column. Rows that
 * belong to an organization, a team or a user go away with it
 * (`onDelete: 'cascade'`, D-WS-008). `invitations.teamId` is a plain column:
 * the plugin keeps it without a foreign key.
 */
export declare function workspaceTables<D extends Dialect, TOrganizationId extends AnyColumnSpec<D>, TMemberId extends AnyColumnSpec<D>, TInvitationId extends AnyColumnSpec<D>, TTeamId extends AnyColumnSpec<D>, TTeamMemberId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { naming, fill, user, ids, }: CreateWorkspaceTablesOptions<D, TOrganizationId, TMemberId, TInvitationId, TTeamId, TTeamMemberId, TFill>): {
    Organization: import("@arki/db/columns").TableOf<D, "organizations", {
        id: TOrganizationId;
        name: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        slug: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        logo: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
        metadata: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Member: import("@arki/db/columns").TableOf<D, "members", {
        id: TMemberId;
        organizationId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Invitation: import("@arki/db/columns").TableOf<D, "invitations", {
        id: TInvitationId;
        organizationId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        email: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        role: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        status: {
            app: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        teamId: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
        inviterId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
    Team: import("@arki/db/columns").TableOf<D, "teams", {
        id: TTeamId;
        name: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        organizationId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        memberCount: {
            app: import("@arki/db/columns").ColumnSpec<D, "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "integer", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
    }>;
    TeamMember: import("@arki/db/columns").TableOf<D, "team_members", {
        id: TTeamMemberId;
        teamId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        membershipKey: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }>;
};
//# sourceMappingURL=workspace-tables.d.ts.map