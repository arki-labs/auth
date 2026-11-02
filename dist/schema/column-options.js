const toSnakeCase = key => key.replaceAll(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const keepKey = key => key;
export function columnNamer(naming = 'snake') {
    return naming === 'camel' ? keepKey : toSnakeCase;
}
export const now = () => /* @__PURE__ */ new Date();
/**
 * One column maker per `fill` mode. The returned function picks the maker
 * for the mode and keeps that maker's column type, so a table's inferred row
 * types follow the mode (`createdAt?` on insert only where a default exists).
 */
export function byFill(makers) {
    return (fill, name) => 
    // TypeScript cannot tie a runtime key to a type parameter
    // (microsoft/TypeScript#30581). The lookup uses that same key, so the
    // assertion only states what the line does.
    makers[fill](name);
}
/** A `NOT NULL` timestamp that is filled on insert: by the app (`'app'`) or by the database (`'database'`). */
export function filledAt(c) {
    return byFill({
        app: name => c.timestamp(name).notNull().$defaultFn(now),
        database: name => c.timestamp(name).notNull().defaultNow(),
    });
}
//# sourceMappingURL=column-options.js.map