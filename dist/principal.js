import { AUTH_ERROR_CODES, AuthError } from './errors.js';
/** The user columns the engine owns, as the principal sees them. */
export const CORE_USER_KEYS = ['id', 'name', 'email', 'emailVerified', 'image', 'createdAt', 'updatedAt'];
const shapeError = (message) => new AuthError(AUTH_ERROR_CODES.principalShape, `[@arki/auth] The engine's ${message}.`);
const isDate = (value) => value instanceof Date && !Number.isNaN(value.getTime());
const optionalText = (value) => (typeof value === 'string' ? value : null);
/**
 * The one narrowing from the engine's user to the app's row type. It checks what it claims: the
 * core columns have their runtime types and every exposed column is present. The exposed columns'
 * own types are the table's, written by the same engine through the same table, so presence is
 * the property that can break (a column the engine was not told about).
 */
function isUserRow(user, fields) {
    const value = (key) => Reflect.get(user, key);
    return (typeof value('id') === 'string' &&
        typeof value('name') === 'string' &&
        typeof value('email') === 'string' &&
        typeof value('emailVerified') === 'boolean' &&
        (value('image') === null || value('image') === undefined || typeof value('image') === 'string') &&
        isDate(value('createdAt')) &&
        isDate(value('updatedAt')) &&
        fields.every(field => value(field) !== undefined));
}
/** The session id, checked to be a string. Its brand is the table's, which the engine wrote. */
export function isSessionId(id) {
    return typeof id === 'string' && id !== '';
}
/** The user id, checked to be a string. Its brand is the table's, which the engine wrote. */
export function isUserId(id) {
    return typeof id === 'string' && id !== '';
}
/** The engine's session row as the app sees it: no token. A missing id or date is `ARKI_AUTH_E004`. */
export function toPrincipalSession(session) {
    const sessionId = Reflect.get(session, 'id');
    const createdAt = Reflect.get(session, 'createdAt');
    const expiresAt = Reflect.get(session, 'expiresAt');
    if (!isSessionId(sessionId) || !isDate(createdAt) || !isDate(expiresAt)) {
        throw shapeError('session lacks its id, createdAt or expiresAt');
    }
    return {
        id: sessionId,
        createdAt,
        expiresAt,
        ipAddress: optionalText(Reflect.get(session, 'ipAddress')),
        userAgent: optionalText(Reflect.get(session, 'userAgent')),
    };
}
/**
 * The engine's user as the app's row: the core columns and the exposed ones, nothing else. A
 * missing column is `ARKI_AUTH_E004`.
 */
export function toUserRow(engineUser, fields) {
    const keys = [...CORE_USER_KEYS, ...fields];
    const missing = keys.filter(key => key !== 'image' && Reflect.get(engineUser, key) === undefined);
    if (missing.length > 0)
        throw shapeError(`user lacks ${missing.map(key => `"${key}"`).join(', ')}`);
    const picked = {};
    for (const key of keys)
        picked[key] = Reflect.get(engineUser, key) ?? null;
    if (!isUserRow(picked, fields))
        throw shapeError('user has a core column of the wrong type');
    return picked;
}
/**
 * Builds the principal from the engine's session. Keeps only the core and the exposed columns, so
 * a column the definition does not expose never reaches a handler or the browser. A missing core
 * or exposed column is `ARKI_AUTH_E004`. `roles` runs on the narrowed user; its failure is thrown,
 * never turned into a guest.
 */
export async function toPrincipal(input, roles) {
    const { session, fields, via, workspaces } = input;
    const user = toUserRow(input.user, fields);
    return {
        user,
        session: toPrincipalSession(session),
        via,
        roles: await roles(user),
        ...(workspaces && {
            workspace: {
                activeOrganizationId: optionalText(Reflect.get(session, 'activeOrganizationId')),
                activeTeamId: optionalText(Reflect.get(session, 'activeTeamId')),
            },
        }),
    };
}
//# sourceMappingURL=principal.js.map