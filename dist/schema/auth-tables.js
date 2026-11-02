import { byFill, columnNamer, filledAt, now } from './column-options.js';
/** The fill-aware column makers of one kit. */
function authColumnMakers(c) {
    return {
        filledAt: filledAt(c),
        /** Timestamps Better Auth writes itself on insert; `'database'` adds a database default anyway. */
        writtenAt: byFill({
            app: name => c.timestamp(name).notNull(),
            database: name => c.timestamp(name).notNull().defaultNow(),
        }),
        /** Verification timestamps: Better Auth's own shape is nullable with a JS default. */
        verificationAt: byFill({
            app: name => c.timestamp(name).$defaultFn(now),
            database: name => c.timestamp(name).notNull().defaultNow(),
        }),
        emailVerified: byFill({
            app: name => c
                .boolean(name)
                .notNull()
                .$defaultFn(() => false),
            database: name => c.boolean(name).notNull().default(false),
        }),
    };
}
/** Columns of the Better Auth `user` model. */
export function authUserColumns(c, { id, naming, fill }) {
    const name = columnNamer(naming);
    const make = authColumnMakers(c);
    return {
        id,
        name: c.text(name('name')).notNull(),
        email: c.text(name('email')).notNull().unique(),
        emailVerified: make.emailVerified(fill, name('emailVerified')),
        image: c.text(name('image')),
        createdAt: make.filledAt(fill, name('createdAt')),
        updatedAt: make.filledAt(fill, name('updatedAt')),
    };
}
/** Columns of the Better Auth `session` model. */
export function authSessionColumns(c, { id, userId, naming, fill }) {
    const name = columnNamer(naming);
    const make = authColumnMakers(c);
    return {
        id,
        expiresAt: c.timestamp(name('expiresAt')).notNull(),
        token: c.text(name('token')).notNull().unique(),
        createdAt: make.writtenAt(fill, name('createdAt')),
        updatedAt: make.writtenAt(fill, name('updatedAt')),
        ipAddress: c.text(name('ipAddress')),
        userAgent: c.text(name('userAgent')),
        userId,
    };
}
/** Columns of the Better Auth `account` model. */
export function authAccountColumns(c, { id, userId, naming, fill }) {
    const name = columnNamer(naming);
    const make = authColumnMakers(c);
    return {
        id,
        accountId: c.text(name('accountId')).notNull(),
        providerId: c.text(name('providerId')).notNull(),
        userId,
        accessToken: c.text(name('accessToken')),
        refreshToken: c.text(name('refreshToken')),
        idToken: c.text(name('idToken')),
        accessTokenExpiresAt: c.timestamp(name('accessTokenExpiresAt')),
        refreshTokenExpiresAt: c.timestamp(name('refreshTokenExpiresAt')),
        scope: c.text(name('scope')),
        password: c.text(name('password')),
        createdAt: make.writtenAt(fill, name('createdAt')),
        updatedAt: make.writtenAt(fill, name('updatedAt')),
    };
}
/** Columns of the Better Auth `verification` model. */
export function authVerificationColumns(c, { id, naming, fill }) {
    const name = columnNamer(naming);
    const make = authColumnMakers(c);
    return {
        id,
        identifier: c.text(name('identifier')).notNull(),
        value: c.text(name('value')).notNull(),
        expiresAt: c.timestamp(name('expiresAt')).notNull(),
        createdAt: make.verificationAt(fill, name('createdAt')),
        updatedAt: make.verificationAt(fill, name('updatedAt')),
    };
}
/**
 * The standard columns with the app's own on top. A key in `extra` replaces
 * the standard column. `id` is named on its own so that the factory can read
 * `Table.id` while the extras are still a type parameter.
 */
function withColumns(base, extra) {
    return { ...base, ...extra };
}
/**
 * The four Better Auth tables. Returns them plus `userForeignKeys`, the factory
 * other features use to point at the user table.
 *
 * @example
 * ```typescript
 * const c = pgColumns(schema);
 * export const { User, Session, Account, Verification, userForeignKeys } = createAuthTables(c, {
 *   fill: 'app',
 *   ids: authIdSources,
 *   columns: {
 *     user: { tweaks: tweaksSpec(c).notNull().default(EMPTY_TWEAKS) },
 *   },
 * });
 * ```
 */
export function createAuthTables(c, { ids, naming, fill, columns, }) {
    const name = columnNamer(naming);
    const User = c.table('users', withColumns(authUserColumns(c, { id: ids.user.primaryColumn(), naming, fill }), columns?.user));
    const userForeignKeys = ids.user.createForeignKeyFactory(() => User.id);
    const userReference = () => c
        .text(name('userId'))
        .notNull()
        .$type()
        .references(() => User.id, { onDelete: 'cascade' });
    const Account = c.table('accounts', withColumns(authAccountColumns(c, { id: ids.account.primaryColumn(), userId: userReference(), naming, fill }), columns?.account));
    const Session = c.table('sessions', withColumns(authSessionColumns(c, { id: ids.session.primaryColumn(), userId: userReference(), naming, fill }), columns?.session));
    const Verification = c.table('verifications', withColumns(authVerificationColumns(c, { id: ids.verification.primaryColumn(), naming, fill }), columns?.verification));
    return { User, Session, Account, Verification, userForeignKeys };
}
//# sourceMappingURL=auth-tables.js.map