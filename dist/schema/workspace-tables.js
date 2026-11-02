import { byFill, columnNamer, filledAt } from './column-options.js';
/** The fill-aware column makers of one kit. */
function workspaceColumnMakers(c) {
    return {
        filledAt: filledAt(c),
        /** `invitations.status`: `'pending'` until the invitee answers. */
        invitationStatus: byFill({
            app: name => c
                .text(name)
                .notNull()
                .$defaultFn(() => 'pending'),
            database: name => c.text(name).notNull().default('pending'),
        }),
        /** `teams.memberCount`: kept by Better Auth's organization plugin (`teams: true`). */
        memberCount: byFill({
            app: name => c
                .integer(name)
                .notNull()
                .$defaultFn(() => 0),
            database: name => c.integer(name).notNull().default(0),
        }),
    };
}
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
export function workspaceTables(c, { naming, fill, user, ids, }) {
    const name = columnNamer(naming);
    const make = workspaceColumnMakers(c);
    const cascade = { onDelete: 'cascade' };
    const Organization = c.table('organizations', {
        id: ids.organization.primaryColumn(),
        name: c.text(name('name')).notNull(),
        slug: c.text(name('slug')).notNull().unique(),
        logo: c.text(name('logo')),
        // Better Auth serializes organization metadata to a JSON string.
        metadata: c.text(name('metadata')),
        createdAt: make.filledAt(fill, name('createdAt')),
    });
    const organizationReference = () => c
        .text(name('organizationId'))
        .notNull()
        .references(() => Organization.id, cascade);
    const userReference = () => c
        .text(name('userId'))
        .notNull()
        .references(() => user.id, cascade);
    const Member = c.table('members', {
        id: ids.member.primaryColumn(),
        organizationId: organizationReference(),
        userId: userReference(),
        role: c.text(name('role')).notNull(),
        createdAt: make.filledAt(fill, name('createdAt')),
    });
    const Invitation = c.table('invitations', {
        id: ids.invitation.primaryColumn(),
        organizationId: organizationReference(),
        email: c.text(name('email')).notNull(),
        role: c.text(name('role')).notNull(),
        status: make.invitationStatus(fill, name('status')),
        teamId: c.text(name('teamId')),
        inviterId: c
            .text(name('inviterId'))
            .notNull()
            .references(() => user.id, cascade),
        expiresAt: c.timestamp(name('expiresAt')).notNull(),
        createdAt: make.filledAt(fill, name('createdAt')),
    });
    const Team = c.table('teams', {
        id: ids.team.primaryColumn(),
        name: c.text(name('name')).notNull(),
        organizationId: organizationReference(),
        memberCount: make.memberCount(fill, name('memberCount')),
        createdAt: make.filledAt(fill, name('createdAt')),
        updatedAt: c.timestamp(name('updatedAt')),
    });
    const TeamMember = c.table('team_members', {
        id: ids.teamMember.primaryColumn(),
        teamId: c
            .text(name('teamId'))
            .notNull()
            .references(() => Team.id, cascade),
        userId: userReference(),
        // Written by Better Auth's organization plugin; never returned to clients.
        membershipKey: c.text(name('membershipKey')).unique(),
        createdAt: make.filledAt(fill, name('createdAt')),
    });
    return { Organization, Member, Invitation, Team, TeamMember };
}
//# sourceMappingURL=workspace-tables.js.map