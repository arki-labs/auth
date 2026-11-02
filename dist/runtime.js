import { buildAuth } from './pg/build.js';
export { assertAuthSecret } from './pg/secret.js';
export { additionalFieldsFromColumns } from './pg/fields.js';
export { authLinkInput } from './pg/mail.js';
export { authAccountColumns, authSessionColumns, authUserColumns, authVerificationColumns, createAuthTables, } from './schema/auth-tables.js';
/**
 * Builds the auth from its definition and the app's bindings. Every mistake a deployment can make
 * is refused here, at boot, with a coded `AuthError`. `S` is what `on.sessionCreating` returns,
 * inferred and checked against the session table.
 */
export function createAuth(definition, bindings) {
    return buildAuth(definition, bindings);
}
//# sourceMappingURL=runtime.js.map