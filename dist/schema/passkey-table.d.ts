import type { Column } from 'drizzle-orm';
import type { AnyColumnSpec, ColumnKit, Dialect } from '@arki/db/columns';
import type { AuthColumnFill, AuthColumnOptions, PrimaryColumnSource } from './column-options.js';
export type CreatePasskeyTablesOptions<D extends Dialect, TPasskeyId extends AnyColumnSpec<D>, TFill extends AuthColumnFill> = AuthColumnOptions<TFill> & {
    /** The app's `User` table. A passkey points at its `id` and goes away with the user. */
    user: {
        id: Column;
    };
    /** The app's id source for the passkey table, e.g. `authIdSources` (its `passkey` key). The lib never makes ids. */
    ids: {
        passkey: PrimaryColumnSource<TPasskeyId>;
    };
};
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
export declare function createPasskeyTables<D extends Dialect, TPasskeyId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { naming, fill, user, ids }: CreatePasskeyTablesOptions<D, TPasskeyId, TFill>): {
    Passkey: import("@arki/db/columns").TableOf<D, "passkeys", {
        id: TPasskeyId;
        /** The label the user gave the passkey, if any. */
        name: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
        publicKey: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        credentialID: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        /** The authenticator's signature counter; a counter that goes back means a cloned key. */
        counter: import("@arki/db/columns").ColumnSpec<D, "integer", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        deviceType: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        backedUp: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        transports: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        aaguid: import("@arki/db/columns").ColumnSpec<D, "text", {
            enum: [string, ...string[]];
        }>;
    }>;
};
//# sourceMappingURL=passkey-table.d.ts.map