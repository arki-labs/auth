import { AUTH_ERROR_CODES, AuthError } from '../../errors.js';
import { errorField, log } from '../../log.js';
const LIMITER_ID = 'arki-auth';
/** The limiter refuses an over-limit attempt with its result, not an `Error`. */
function msBeforeNextOf(rejection) {
    if (typeof rejection !== 'object' || rejection === null || rejection instanceof Error)
        return undefined;
    const ms = Reflect.get(rejection, 'msBeforeNext');
    return typeof ms === 'number' ? ms : undefined;
}
export function kvRateLimitStorage(store) {
    return {
        async consume(key, rule) {
            const limiter = store.getRateLimiter(LIMITER_ID, { points: rule.max, duration: rule.window });
            try {
                await limiter.consume(key);
                return { allowed: true, retryAfter: null };
            }
            catch (error) {
                const msBeforeNext = msBeforeNextOf(error);
                if (msBeforeNext !== undefined)
                    return { allowed: false, retryAfter: Math.max(1, Math.ceil(msBeforeNext / 1000)) };
                log.error('The rate-limit store failed; the request is refused', { error: errorField(error) });
                throw new AuthError(AUTH_ERROR_CODES.storeUnavailable, 'The rate-limit store is unavailable.', {
                    cause: error,
                });
            }
        },
    };
}
//# sourceMappingURL=kv-storage.js.map