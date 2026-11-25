/**
 * `@arki/auth/ids` — the auth id types and their generators. Browser-safe: no Drizzle, no Zod in
 * the types. Check ids with the schemas on `@arki/auth/zod`; make columns with `@arki/auth/pg`.
 */
import type { IdOf } from '@arki/contracts';
import type { authRequestId } from './id-declarations.js';
import { accountId, passkeyId, sessionId, verificationId } from './id-declarations.js';
export type { UserId } from '@arki/contracts';
export type AuthRequestId = IdOf<typeof authRequestId>;
export type SessionId = IdOf<typeof sessionId>;
export type AccountId = IdOf<typeof accountId>;
export type VerificationId = IdOf<typeof verificationId>;
export type PasskeyId = IdOf<typeof passkeyId>;
/** A new user id: `usr_` and 24 random letters and digits. */
export declare const createUserId: () => `usr_${string}` | import("@arki/contracts").IdGenerationFailure;
export declare const createSessionId: () => `sess_${string}` | import("@arki/contracts").IdGenerationFailure;
export declare const createAccountId: () => `acc_${string}` | import("@arki/contracts").IdGenerationFailure;
export declare const createVerificationId: () => `verif_${string}` | import("@arki/contracts").IdGenerationFailure;
export declare const createPasskeyId: () => `pkey_${string}` | import("@arki/contracts").IdGenerationFailure;
//# sourceMappingURL=ids.d.ts.map