import type { AuthDefinition, IdTokenMethodsOf, SocialMethod } from '../definition.js';
import type { SessionIdOf, UserIdOf, UserRow } from '../principal.js';
import type { AuthEngine } from './engine.js';
import type { AuthBindingEvents, AuthBindings, AuthRuntime, AuthSessions, AuthTables, AuthTestingApi, IdTokenSession, IdTokenSignIn, PrincipalFor, SessionValues } from './types.js';
/** A working auth. Build it with {@link createAuth}. */
export type Auth<D extends AuthDefinition, T extends AuthTables> = {
    readonly definition: D;
    /** Serves the engine's routes under `/api/auth`. */
    readonly handler: (request: Request) => Promise<Response>;
    /** Who is calling, or `null` for a guest. A cookie and a bearer token together are `ARKI_AUTH_E401`. */
    readonly principal: (headers: Headers) => Promise<PrincipalFor<D, T> | null>;
    readonly sessions: AuthSessions<PrincipalFor<D, T>, SessionIdOf<T>, UserIdOf<T>>;
    /**
     * Whether the definition enables `provider` and the engine can verify its id tokens. Narrows
     * `provider` for `signInWithIdToken`, so app code can branch without naming a disabled method.
     */
    readonly supportsIdToken: (provider: SocialMethod) => provider is IdTokenMethodsOf<D>;
    /**
     * Native sign-in: verifies the provider's id token, signs the user in (creating them on first
     * use) and returns the bearer token with its principal. `null` when the sign-in is refused: a
     * token that fails verification (signature, audience, issuer, age, nonce), no email from the
     * provider, an unverified email, or an existing user while `account.linking` is off. Needs
     * `sessions: { bearer: true }` (`ARKI_AUTH_E001` otherwise). Rate limited like the sign-in routes:
     * `ARKI_AUTH_E429` over the limit, `ARKI_AUTH_E503` when the store fails.
     */
    readonly signInWithIdToken: (input: IdTokenSignIn<D>) => Promise<IdTokenSession<PrincipalFor<D, T>> | null>;
    /** The engine itself: for the E2E handler, tests and the escape hatch. Not for app code. */
    readonly engine: AuthEngine;
    /** Test-only helpers. Every call throws `ARKI_AUTH_E005` in production. */
    readonly testing: AuthTestingApi<UserRow<D, T>>;
};
/** Runtime values as the builder reads them: `providers` is checked at boot, not trusted. */
export type CheckedRuntime = Omit<AuthRuntime<AuthDefinition>, 'providers'> & {
    readonly providers?: unknown;
};
/**
 * The bindings as the builder reads them. `createAuth` narrows `runtime` to the definition and
 * checks `sessionCreating`'s exact return type; the builder only needs its column values.
 */
export type CheckedBindings<D extends AuthDefinition, T extends AuthTables> = Omit<AuthBindings<D, T>, 'runtime' | 'on'> & {
    readonly runtime: () => CheckedRuntime;
    readonly on?: AuthBindingEvents<D, T, SessionValues<T>>;
};
/**
 * Builds the auth. Every mistake a deployment can make is refused here, at boot: unknown fields
 * and missing provider credentials (`E001`), a weak secret in production (`E002`), mail methods
 * without a mailer (`E003`), missing workspace tables (`E007`), no shared rate-limit store in
 * production (`E001`).
 */
export declare function buildAuth<D extends AuthDefinition, T extends AuthTables>(definition: D, bindings: CheckedBindings<D, T>): Auth<D, T>;
//# sourceMappingURL=build.d.ts.map