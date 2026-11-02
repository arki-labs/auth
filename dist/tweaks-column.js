import { jsonb } from 'drizzle-orm/pg-core';
/**
 * Default payload written to the User.tweaks column when a user is first
 * created. Empty global = use design-system defaults. Empty pageScoped = no
 * page-scoped tweaks set yet.
 */
export const EMPTY_TWEAKS = {
    version: 1,
    global: {},
    pageScoped: {},
};
/**
 * Drizzle column factory used by every app's User table to consistently
 * declare the tweaks store. Call as:
 *
 *   tweaks: tweaksColumn().notNull().default(EMPTY_TWEAKS),
 *
 * The shape is intentionally opaque at the schema level — the @fleet/sitekit
 * persistence layer is responsible for type-narrowing at read time.
 */
export function tweaksColumn(name = 'tweaks') {
    return jsonb(name).$type();
}
/**
 * The same tweaks store as a column kit spec, for tables written with the kit, such as
 * `createAuthTables`' `columns.user`: `jsonb` on Postgres, JSON text on SQLite.
 *
 *   tweaks: tweaksSpec(c).notNull().default(EMPTY_TWEAKS),
 */
export function tweaksSpec(c, name = 'tweaks') {
    return c.json(name).$type();
}
//# sourceMappingURL=tweaks-column.js.map