/**
 * The one place the engine's options are built. Plain data in, `BetterAuthOptions` out: the
 * plugin list is a plain array of the engine's own plugin values, with no cast.
 */
import type { BetterAuthOptions, BetterAuthPlugin } from 'better-auth';
import type { Dialect } from '@arki/db/dialect';
import type { AuthMethod, ResolvedDefinition } from '../definition.js';
import type { AdditionalFields } from './fields.js';
import type { AuthMail } from './mail.js';
import type { RateLimitStorage } from './security/kv-storage.js';
import type { AuthDb, AuthTable, AuthTables } from './types.js';
export type SocialProviders = NonNullable<BetterAuthOptions['socialProviders']>;
export type EngineRuntime = {
    readonly url: string;
    readonly productionUrl: string | undefined;
    readonly secret: string | undefined;
    readonly production: boolean;
    readonly trustedOrigins: readonly string[];
    /** The one header the engine reads the client address from. Never a caller-set default. */
    readonly clientIpHeader: string;
};
export type EngineCallbacks = {
    /** Refuses a user creation by throwing `AuthError`. Absent: no gate (and no engine validation hook). */
    readonly beforeUserCreate: ((event: {
        email: string;
        method: AuthMethod;
        request?: Request;
    }) => Promise<void>) | undefined;
    /** `body` is the request body: an id-token sign-in names its provider there, not in the path. */
    readonly userCreated: (user: object, path: string | undefined, body: unknown) => Promise<void>;
    readonly passwordReset: (userId: string) => Promise<void>;
    /** The app's values for a new session's own columns. Absent: no hook. */
    readonly sessionCreating: ((session: object, request: Request | undefined) => Promise<Readonly<Record<string, unknown>>>) | undefined;
    readonly sessionCreated: (session: object) => Promise<void>;
};
export type EngineInput = {
    readonly definition: ResolvedDefinition;
    readonly runtime: EngineRuntime;
    readonly db: AuthDb;
    /** The adapter's dialect, read from `db`. */
    readonly provider: Dialect;
    readonly tables: AuthTables;
    readonly additionalFields: AdditionalFields;
    /** The app's own session columns `sessionCreating` writes; the engine drops fields it does not know. */
    readonly sessionFields: AdditionalFields;
    readonly socialProviders: SocialProviders;
    readonly mail: AuthMail | undefined;
    /** The shared store, `'memory'` for the engine's per-process limiter, or `undefined` for none. */
    readonly rateLimit: RateLimitStorage | 'memory' | undefined;
    readonly callbacks: EngineCallbacks;
    readonly methodOfSource: (source: {
        method: string;
        oauth?: {
            providerId: string;
        };
    }) => AuthMethod | undefined;
    readonly plugins: readonly BetterAuthPlugin[];
};
/** The engine's model names mapped to the app's tables. */
export declare function engineSchema(tables: AuthTables): Record<string, AuthTable>;
export declare function engineOptions(input: EngineInput): BetterAuthOptions;
//# sourceMappingURL=assemble.d.ts.map