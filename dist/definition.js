/**
 * The auth declaration: plain data that the server factory, the client and the sign-in form all
 * read. It imports no engine and no database code, so the start app can import the same object.
 *
 * @example
 * export const authDefinition = defineAuth({
 *   app: { name: 'Notes', key: 'notes' },
 *   methods: ['password', 'magicLink', 'google'],
 *   user: { fields: ['plan'] },
 *   sessions: { bearer: true },
 * });
 */
import { AUTH_ERROR_CODES, AuthError } from './errors.js';
/** Social sign-in providers. Their credentials are runtime values, given to the server factory. */
export const SOCIAL_METHODS = ['google', 'apple', 'facebook', 'microsoft', 'github'];
/**
 * Social methods whose id tokens the engine can verify, so a native app can sign in with the token
 * its platform SDK returned (`auth.signInWithIdToken`). GitHub has no id tokens.
 */
export const ID_TOKEN_METHODS = ['google', 'apple', 'facebook', 'microsoft'];
/** Every sign-in method. Email OTP and passkeys are later work and are not accepted yet. */
export const AUTH_METHODS = ['password', 'magicLink', ...SOCIAL_METHODS];
const DAY = 24 * 60 * 60;
/** User columns the engine owns. A definition cannot expose them again as extra fields. */
const CORE_USER_FIELDS = new Set(['id', 'name', 'email', 'emailVerified', 'image', 'createdAt', 'updatedAt']);
const AUTH_METHOD_NAMES = new Set(AUTH_METHODS);
const SOCIAL_METHOD_NAMES = new Set(SOCIAL_METHODS);
const isAuthMethod = (value) => AUTH_METHOD_NAMES.has(value);
export const isSocialMethod = (value) => SOCIAL_METHOD_NAMES.has(value);
const ID_TOKEN_METHOD_NAMES = new Set(ID_TOKEN_METHODS);
export const isIdTokenMethod = (value) => ID_TOKEN_METHOD_NAMES.has(value);
function invalid(message) {
    throw new AuthError(AUTH_ERROR_CODES.invalidConfig, `[@arki/auth] ${message}`);
}
function assertSeconds(value, label) {
    if (!Number.isInteger(value) || value <= 0)
        invalid(`${label} must be a positive whole number of seconds.`);
}
function duplicateOf(values) {
    return values.find((value, index) => values.indexOf(value) !== index);
}
/**
 * Checks a definition and fills its defaults. Throws `ARKI_AUTH_E001` on the first mistake.
 * The factory calls it again, so a hand-written object gets the same checks.
 */
export function resolveDefinition(definition) {
    const { app, methods, user, sessions, magicLink, workspaces, account } = definition;
    if (app.name.trim() === '')
        invalid('`app.name` is empty.');
    if (!/^[a-z0-9][a-z0-9-]*$/.test(app.key)) {
        invalid(`\`app.key\` "${app.key}" must be lower-case letters, digits and dashes (it prefixes the cookies).`);
    }
    if (methods.length === 0)
        invalid('`methods` is empty: enable at least one sign-in method.');
    // Read as plain strings: a caller without the types can pass anything.
    const names = methods;
    const unknownMethod = names.find(method => !isAuthMethod(method));
    if (unknownMethod !== undefined)
        invalid(`Unknown method "${unknownMethod}". Known: ${AUTH_METHODS.join(', ')}.`);
    const repeatedMethod = duplicateOf(methods);
    if (repeatedMethod !== undefined)
        invalid(`Method "${repeatedMethod}" is listed twice.`);
    const fields = user?.fields ?? [];
    const signUpFields = user?.signUpFields ?? [];
    const repeatedField = duplicateOf(fields);
    if (repeatedField !== undefined)
        invalid(`\`user.fields\` lists "${repeatedField}" twice.`);
    const coreField = fields.find(field => CORE_USER_FIELDS.has(field));
    if (coreField !== undefined)
        invalid(`\`user.fields\` cannot list "${coreField}": the engine already owns it.`);
    const strayField = signUpFields.find(field => !fields.includes(field));
    if (strayField !== undefined)
        invalid(`\`user.signUpFields\` lists "${strayField}", which is not in \`user.fields\`.`);
    const expiresIn = sessions?.expiresIn ?? 7 * DAY;
    const refreshEvery = sessions?.refreshEvery ?? DAY;
    assertSeconds(expiresIn, '`sessions.expiresIn`');
    assertSeconds(refreshEvery, '`sessions.refreshEvery`');
    if (refreshEvery >= expiresIn)
        invalid('`sessions.refreshEvery` must be shorter than `sessions.expiresIn`.');
    if (magicLink !== undefined && !methods.includes('magicLink')) {
        invalid('`magicLink` options are set but the `magicLink` method is not enabled.');
    }
    return {
        app,
        methods,
        fields,
        signUpFields,
        verifyEmail: definition.verifyEmail ?? 'require',
        sessions: { expiresIn, refreshEvery, bearer: sessions?.bearer ?? false },
        magicLink: { signUp: magicLink?.signUp ?? true },
        workspaces,
        account: {
            changeEmail: account?.changeEmail ?? false,
            linking: account?.linking ?? false,
            delete: account?.delete ?? false,
        },
        expo: definition.expo ?? false,
    };
}
/**
 * Declares the app's auth. Returns the definition unchanged after checking it; the point is the
 * literal types: `methods` and `user.fields` keep their exact names for the server, the client and
 * the principal, and `workspaces` stays as written for the client.
 */
export function defineAuth(definition) {
    resolveDefinition(definition);
    return definition;
}
//# sourceMappingURL=definition.js.map