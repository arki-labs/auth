/**
 * `@arki/auth` in a Dot app. Node and Bun.
 *
 * `auth(definition, bindings)` provides `auth`: the same factory as `createAuth`, with `db` and
 * `mail` taken from the graph (the `db` adapter and `@arki/mail/dot`). `runtime` runs at boot,
 * so `dot explain` and the manifest never read secrets.
 *
 * @example
 * export const authn = auth(authDefinition, { tables: authTables, rateLimit: { store: kv }, runtime: () => ({ … }) });
 * export type Auth = AuthOf<typeof authn>;
 * defineApp('notes').infra(database).infra(mail(() => ({ … }))).infra(authn);
 */
import type { Unit } from '@arki/dot/unit';
import type { Mailer } from '@arki/mail';
import type { AuthDefinition } from './definition.js';
import type { Auth } from './pg/index.js';
import type { AuthBindings, AuthDb, AuthTables, SessionValues } from './pg/types.js';
/** The auth as a Dot service named `auth`. Needs `db` and `mail`. */
export declare function auth<D extends AuthDefinition, T extends AuthTables, S extends SessionValues<T> = SessionValues<T>>(definition: D, bindings: Omit<AuthBindings<D, T, S>, 'db' | 'mail'>): Omit<Unit<import("@arki/dot/unit").WireNeeds<{
    db: import("@arki/dot/unit").Service<AuthDb>;
    mail: import("@arki/dot/unit").Service<Mailer>;
}>, import("@arki/dot/unit").ProvidedValues<{
    auth: Auth<D, T>;
}>, {
    db: import("@arki/dot/unit").Service<AuthDb>;
    mail: import("@arki/dot/unit").Service<Mailer>;
}, "auth", import("@arki/dot/unit").EmptyOwnership, import("@arki/dot/unit").EmptyPhases>, "factories" | "hooks" | "logging"> & import("@arki/dot/unit").LoggingSlot<import("@arki/dot/unit").DotLoggingHandle<undefined>> & import("@arki/dot/unit").FactoryContract<import("@arki/dot/unit").ProvidedValues<{
    auth: Auth<D, T>;
}>> & {
    readonly factories: {
        readonly auth: (ctx: never) => Auth<D, T>;
    };
    readonly hooks: import("@arki/dot/unit").PhaseHooks<never, {
        readonly configure: undefined;
        readonly start: undefined;
        readonly stop: undefined;
        readonly dispose: undefined;
    }, import("@arki/dot/unit").DotConfigureContext> & import("@arki/dot/unit").BootSlot<import("@arki/dot/unit").CtxOf<{
        db: import("@arki/dot/unit").Service<AuthDb>;
        mail: import("@arki/dot/unit").Service<Mailer>;
    }> & import("@arki/dot/unit").ProvidedValues<{
        auth: Auth<D, T>;
    }> & import("@arki/dot/unit").KernelCtx, undefined>;
} & import("@arki/dot/unit").InfraRole;
/** The `auth` service type of an `auth(...)` plugin: `AuthOf<typeof authn>`. */
export type AuthOf<P> = P extends Unit<infer _Needs, {
    readonly auth: infer A;
}> ? A : never;
//# sourceMappingURL=dot.d.ts.map