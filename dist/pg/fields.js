import { getTableColumns } from 'drizzle-orm';
import { AUTH_ERROR_CODES, AuthError } from '../errors.js';
const invalid = (message) => {
    throw new AuthError(AUTH_ERROR_CODES.invalidConfig, `[@arki/auth] ${message}`);
};
const isPrimitiveDefault = (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
/** The engine field type for a Drizzle column type, e.g. `'string enum'` → its values. */
function fieldTypeOf(name, dataType, enumValues) {
    const [kind, constraint] = dataType.split(' ');
    if (kind === 'string') {
        return constraint === 'enum' && enumValues !== undefined && enumValues.length > 0 ? [...enumValues] : 'string';
    }
    if (kind === 'number')
        return 'number';
    if (kind === 'boolean')
        return 'boolean';
    if (kind === 'object' && constraint === 'date')
        return 'date';
    if (kind === 'object' && constraint === 'json')
        return 'json';
    return invalid(`User column "${name}" has type "${dataType}", which the engine cannot carry. Expose another column.`);
}
/**
 * The engine's `user.additionalFields` for the exposed columns: required when the column is
 * `NOT NULL` without a default, settable by the client only when listed in `signUpFields`, and
 * returned unless `returned` is `false` (the session's own columns stay server-side). A name that
 * is not a column of the table is `ARKI_AUTH_E001`.
 */
export function additionalFieldsFromColumns(table, fields, signUpFields, returned = true) {
    const columns = getTableColumns(table);
    const result = {};
    for (const name of fields) {
        const column = Object.hasOwn(columns, name) ? columns[name] : undefined;
        if (column === undefined)
            invalid(`\`user.fields\` names "${name}", which is not a column of the user table.`);
        else {
            const enumValues = Reflect.get(column, 'enumValues');
            const values = Array.isArray(enumValues) && enumValues.every(value => typeof value === 'string') ? enumValues : undefined;
            const defaultValue = column.default;
            result[name] = {
                type: fieldTypeOf(name, column.dataType, values),
                required: column.notNull && !column.hasDefault,
                input: signUpFields.includes(name),
                returned,
                ...(isPrimitiveDefault(defaultValue) && { defaultValue }),
            };
        }
    }
    return result;
}
//# sourceMappingURL=fields.js.map