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
import { pushSchema } from 'drizzle-kit/api-postgres';
import { defineRelations, is, sql } from 'drizzle-orm';
import { getTableConfig, pgSchema, PgTable } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/pglite';
import { mailer } from '@arki/mail';
import { magicLink } from '@arki/mail/templates/auth';
import { mailSink } from '@arki/mail/testing';
import { SOCIAL_METHODS } from '../definition.js';
import { buildAuth } from '../pg/build.js';
/** A secret long enough for production checks; only ever used in tests. */
export const TEST_AUTH_SECRET = 'arki-auth-test-secret-0123456789abcdef';
/** Opens an in-memory PGlite and pushes the tables into it. */
async function openPglite(tables) {
    const client = new PGlite('memory://');
    await client.waitReady;
    const db = drizzle({ client });
    // The push only creates the Postgres schemas it is given; add the ones the tables live in.
    const schemaNames = Object.values(tables).flatMap(value => is(value, PgTable) ? [getTableConfig(value).schema ?? 'public'] : []);
    const schemas = Object.fromEntries([...new Set(schemaNames)].filter(name => name !== 'public').map(name => [`schema:${name}`, pgSchema(name)]));
    const { apply } = await pushSchema({ ...schemas, ...tables }, db);
    await apply();
    return { db, close: () => client.close() };
}
/** Opens an in-memory libSQL database and creates the tables in it. */
async function openLibsql(tables) {
    // Loaded here, so an app testing on PGlite needs neither `@libsql/client` nor the SQLite kit.
    const { createLibsqlDb } = await import('@arki/db/libsql');
    const { generateDrizzleJson, generateMigration } = await import('drizzle-kit/payload/sqlite');
    const { db, close } = createLibsqlDb({ url: ':memory:', relations: defineRelations({}) });
    // drizzle-kit has no SQLite push that takes a Drizzle database: diff from empty and run the DDL.
    const statements = await generateMigration(await generateDrizzleJson({}), await generateDrizzleJson({ ...tables }));
    for (const statement of statements)
        await db.run(sql.raw(statement));
    return { db, close: () => Promise.resolve(close()) };
}
const openers = { pglite: openPglite, libsql: openLibsql };
const fakeProviders = Object.fromEntries(SOCIAL_METHODS.map(method => [method, { clientId: `${method}-test-id`, clientSecret: `${method}-test-secret` }]));
export async function testAuth(definition, bindings) {
    const { database = 'pglite', ...rest } = bindings;
    const { db, close } = await openers[database]({ ...rest.schema, ...rest.tables });
    const sink = mailSink();
    const sinkMailer = mailer({ transport: sink, from: `${definition.app.name} <auth@test.dev>` });
    const build = (overrides = {}) => {
        const { runtime, ...others } = { ...rest, ...overrides };
        return buildAuth(definition, {
            rateLimit: false,
            mail: sinkMailer,
            ...others,
            db,
            runtime: () => ({
                url: 'http://localhost:3000',
                secret: TEST_AUTH_SECRET,
                production: false,
                providers: fakeProviders,
                ...runtime,
            }),
        });
    };
    return {
        auth: build(),
        db,
        mail: sink,
        rebuild: build,
        dispose: close,
    };
}
/**
 * Signs a user in through the engine: finds or creates the user (verified), creates a real
 * session, and returns headers that carry it. `password` also sets the user's password. The session is listable and revocable like any
 * other. Throws `ARKI_AUTH_E005` when the auth runs in production.
 */
export function actingAs(auth, user, options) {
    return auth.testing.signIn(user, options);
}
/** The link in the latest mail from `template` to `to`. Throws when there is none. */
export function lastLink(mail, template, to) {
    const sent = mail.sentTo(to).filter(record => record.template === template.name);
    const text = sent.at(-1)?.message.text;
    const url = text === undefined ? undefined : /https?:\/\/\S+/.exec(text)?.[0];
    if (url === undefined)
        throw new Error(`No "${template.name}" mail with a link was sent to ${to}.`);
    return new URL(url);
}
/** The link in the latest magic-link mail to `to`. */
export const lastMagicLink = (mail, to) => lastLink(mail, magicLink, to);
//# sourceMappingURL=index.js.map