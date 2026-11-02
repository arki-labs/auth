/**
 * The runtime half of "types written once": the engine learns the exposed user columns from the
 * app's Drizzle table, so nothing is declared twice.
 */
import type { BetterAuthOptions } from 'better-auth';
import type { AuthTable } from './types.js';
/** The engine's description of extra user fields. */
export type AdditionalFields = NonNullable<NonNullable<BetterAuthOptions['user']>['additionalFields']>;
/**
 * The engine's `user.additionalFields` for the exposed columns: required when the column is
 * `NOT NULL` without a default, settable by the client only when listed in `signUpFields`, and
 * returned unless `returned` is `false` (the session's own columns stay server-side). A name that
 * is not a column of the table is `ARKI_AUTH_E001`.
 */
export declare function additionalFieldsFromColumns(table: AuthTable, fields: readonly string[], signUpFields: readonly string[], returned?: boolean): AdditionalFields;
//# sourceMappingURL=fields.d.ts.map