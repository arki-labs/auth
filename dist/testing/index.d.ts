/**
 * `@arki/auth/testing` — a real auth on an in-memory PGlite (or libSQL), with every mail kept in a
 * sink.
 *
 * `testAuth` builds the same engine as production (same factory, same plugins), so a flow that
 * passes here passes for real. `actingAs` makes a real session through the engine. Import this
 * module only from tests: `@electric-sql/pglite`, `@libsql/client` and `drizzle-kit` are optional
 * peers. `database: 'libsql'` runs the same auth on SQLite, with tables from `@arki/auth/sqlite`.
 *
 * @example
 * const { auth, mail, dispose } = await testAuth(authDefinition, { tables: authTables });
 * const { headers } = await actingAs(auth, { email: 'alice@notes.test', plan: 'pro' });
 * expect((await auth.principal(headers))?.user.plan).toBe('pro');
 * await dispose();
 */
import { PGlite } from '@electric-sql/pglite';
import type { MailTemplate } from '@arki/mail';
import type { MailSink } from '@arki/mail/testing';
import type { AuthDefinition } from '../definition.js';
import type { Auth, CheckedRuntime } from '../pg/build.js';
import type { AuthBindings, AuthTables, AuthTestingApi, SessionValues, TablesExposing, TestSignInOptions, TestUserInput } from '../pg/types.js';
/** A secret long enough for production checks; only ever used in tests. */
export declare const TEST_AUTH_SECRET = "arki-auth-test-secret-0123456789abcdef";
/** Opens an in-memory PGlite and pushes the tables into it. */
declare function openPglite(tables: Readonly<Record<string, unknown>>): Promise<{
    db: import("drizzle-orm/pglite").PgliteDatabase<import("drizzle-orm").EmptyRelations> & {
        $client: PGlite;
    };
    close: () => Promise<void>;
}>;
/** Opens an in-memory libSQL database and creates the tables in it. */
declare function openLibsql(tables: Readonly<Record<string, unknown>>): Promise<{
    db: import("drizzle-orm/libsql/driver-core").LibSQLDatabase<import("drizzle-orm").ExtractTablesWithRelations<{}, import("drizzle-orm").ExtractTablesFromSchema<{}>>>;
    close: () => Promise<void>;
}>;
declare const openers: {
    pglite: typeof openPglite;
    libsql: typeof openLibsql;
};
/** The in-memory databases `testAuth` runs on. */
export type TestDatabase = keyof typeof openers;
/** The Drizzle database `testAuth` hands back for `database`. */
export type TestDb<B extends TestDatabase> = Awaited<ReturnType<(typeof openers)[B]>>['db'];
export type TestAuthBindings<D extends AuthDefinition, T extends AuthTables, S extends SessionValues<T> = SessionValues<T>> = Partial<Omit<AuthBindings<D, T, S>, 'db' | 'tables' | 'runtime'>> & {
    /** The tables, built for the database: `@arki/auth/pg` for PGlite, `@arki/auth/sqlite` for libSQL. */
    readonly tables: T & TablesExposing<D>;
    /** Other tables to create next to the auth tables (an app's tables that point at users). */
    readonly schema?: Readonly<Record<string, unknown>>;
    /** Overrides of the test runtime. Every enabled social provider gets fake credentials. */
    readonly runtime?: Partial<Omit<CheckedRuntime, 'providers'>>;
};
export type TestAuth<D extends AuthDefinition, T extends AuthTables, B extends TestDatabase = 'pglite'> = {
    readonly auth: Auth<D, T>;
    readonly db: TestDb<B>;
    /** Every mail the auth sent. */
    readonly mail: MailSink;
    /** The same database again: a second auth (another secret, another replica) over the same rows. */
    readonly rebuild: (bindings?: Omit<TestAuthBindings<D, T>, 'tables' | 'schema'>) => Auth<D, T>;
    readonly dispose: () => Promise<void>;
};
/**
 * A real auth on a fresh in-memory database with the auth tables created: PGlite by default,
 * libSQL with `database: 'libsql'`. Mail goes to a sink; rate limiting is off unless `rateLimit`
 * is given; the runtime is local and not production.
 */
export declare function testAuth<D extends AuthDefinition, T extends AuthTables, S extends SessionValues<T> = SessionValues<T>>(definition: D, bindings: TestAuthBindings<D, T, S> & {
    readonly database: 'libsql';
}): Promise<TestAuth<D, T, 'libsql'>>;
export declare function testAuth<D extends AuthDefinition, T extends AuthTables, S extends SessionValues<T> = SessionValues<T>>(definition: D, bindings: TestAuthBindings<D, T, S> & {
    readonly database?: 'pglite';
}): Promise<TestAuth<D, T>>;
/**
 * Signs a user in through the engine: finds or creates the user (verified), creates a real
 * session, and returns headers that carry it. `password` also sets the user's password. The session is listable and revocable like any
 * other. Throws `ARKI_AUTH_E005` when the auth runs in production.
 */
export declare function actingAs<U>(auth: {
    readonly testing: AuthTestingApi<U>;
}, user: TestUserInput<U>, options?: TestSignInOptions): Promise<{
    readonly headers: Headers;
    readonly user: U;
}>;
/** The link in the latest mail from `template` to `to`. Throws when there is none. */
export declare function lastLink(mail: MailSink, template: Pick<MailTemplate, 'name'>, to: string): URL;
/** The link in the latest magic-link mail to `to`. */
export declare const lastMagicLink: (mail: MailSink, to: string) => URL;
export {};
//# sourceMappingURL=index.d.ts.map