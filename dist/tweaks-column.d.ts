import type { ColumnKit, Dialect } from '@arki/db/columns';
/**
 * Default payload written to the User.tweaks column when a user is first
 * created. Empty global = use design-system defaults. Empty pageScoped = no
 * page-scoped tweaks set yet.
 */
export declare const EMPTY_TWEAKS: {
    version: 1;
    global: Record<string, unknown>;
    pageScoped: Record<string, unknown>;
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
export declare function tweaksColumn(name?: string): import("drizzle-orm/pg-core").Set$Type<import("drizzle-orm/pg-core").PgJsonbBuilder, {
    version: 1;
    global: Record<string, unknown>;
    pageScoped: Record<string, unknown>;
}>;
/**
 * The same tweaks store as a column kit spec, for tables written with the kit, such as
 * `createAuthTables`' `columns.user`: `jsonb` on Postgres, JSON text on SQLite.
 *
 *   tweaks: tweaksSpec(c).notNull().default(EMPTY_TWEAKS),
 */
export declare function tweaksSpec<D extends Dialect>(c: ColumnKit<D>, name?: string): import("@arki/db/columns").ColumnSpec<D, "json", Omit<import("@arki/db/columns").NoFlags, "type"> & {
    type: {
        version: 1;
        global: Record<string, unknown>;
        pageScoped: Record<string, unknown>;
    };
}>;
//# sourceMappingURL=tweaks-column.d.ts.map