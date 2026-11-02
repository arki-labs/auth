/**
 * Session management bound to the principal. A principal can only list and revoke its own
 * sessions; the summaries never carry the token.
 */
import type { AnyPrincipal } from '../principal.js';
import type { AuthEngine } from './engine.js';
import type { AuthSessions } from './types.js';
type EngineContext = Awaited<AuthEngine['$context']>;
export declare function createSessions<P extends AnyPrincipal, SId extends string, UId extends string>(context: () => Promise<EngineContext>): AuthSessions<P, SId, UId>;
export {};
//# sourceMappingURL=sessions.d.ts.map