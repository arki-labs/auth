import { columnNamer, filledAt } from './column-options.js';
/**
 * The `passkeys` table the passkey sign-in needs, written once against the column kit. Build it
 * only when the definition lists `passkey`, and pass it with the other tables:
 * `tables: { ...authTables, ...passkeyTables }`.
 *
 * Column keys mirror the engine's passkey model fields (`credentialID`, `publicKey`, `counter`, …),
 * because the Drizzle adapter maps each field to the identically-named column.
 *
 * @example
 * ```typescript
 * export const passkeyTables = createPasskeyTables(c, { fill: 'app', user: authTables.User, ids: authIdSources });
 * ```
 */
export function createPasskeyTables(c, { naming, fill, user, ids }) {
    const name = columnNamer(naming);
    const Passkey = c.table('passkeys', {
        id: ids.passkey.primaryColumn(),
        /** The label the user gave the passkey, if any. */
        name: c.text(name('name')),
        publicKey: c.text(name('publicKey')).notNull(),
        userId: c
            .text(name('userId'))
            .notNull()
            .references(() => user.id, { onDelete: 'cascade' }),
        credentialID: c.text(name('credentialID')).notNull(),
        /** The authenticator's signature counter; a counter that goes back means a cloned key. */
        counter: c.integer(name('counter')).notNull(),
        deviceType: c.text(name('deviceType')).notNull(),
        backedUp: c.boolean(name('backedUp')).notNull(),
        transports: c.text(name('transports')),
        createdAt: filledAt(c)(fill, name('createdAt')),
        aaguid: c.text(name('aaguid')),
    }, table => [
        c.index('passkeys_user_id_idx').on(table.userId),
        c.uniqueIndex('passkeys_credential_id_idx').on(table.credentialID),
    ]);
    return { Passkey };
}
//# sourceMappingURL=passkey-table.js.map