/**
 * The engine's rate limiter on the shared `@arki/kv` store. Every replica counts in one place.
 * A store failure is never a pass: it throws `ARKI_AUTH_E503`, which the handler answers with 503.
 */
import type { BetterAuthOptions } from 'better-auth';
import type { RateLimitStore } from '../types.js';
/** The engine's atomic rate-limit storage contract. */
export type RateLimitStorage = NonNullable<NonNullable<BetterAuthOptions['rateLimit']>['customStorage']>;
export declare function kvRateLimitStorage(store: RateLimitStore): RateLimitStorage;
//# sourceMappingURL=kv-storage.d.ts.map