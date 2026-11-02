/**
 * The principal: the one "who is calling" value that the principal steps (`authed`, `verified`,
 * `role`) and policies read. `null` means a guest. Its `user` is the app's own user row type (branded id),
 * narrowed to the core columns plus the extra columns the definition exposes.
 *
 * This module is pure: types and one narrowing function, no engine and no database code.
 */
import type { ExposedFields } from './definition.js';
/** The user columns the engine owns, as the principal sees them. */
export declare const CORE_USER_KEYS: readonly ['id', 'name', 'email', 'emailVerified', 'image', 'createdAt', 'updatedAt'];
export type CoreUserKey = (typeof CORE_USER_KEYS)[number];
/** The shape every auth user table's row has. The app's table may brand `id` and add columns. */
export type CoreUserRow = {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly emailVerified: boolean;
    readonly image: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
};
/** Anything with a user table and a session table whose rows the principal is built from. */
export type PrincipalTables = {
    readonly User: {
        readonly $inferSelect: CoreUserRow;
    };
    readonly Session: {
        readonly $inferSelect: {
            readonly id: string;
        };
    };
};
/** The app's user id type, read from its user table. */
export type UserIdOf<T extends PrincipalTables> = T['User']['$inferSelect']['id'];
/** The app's session id type, read from its session table. */
export type SessionIdOf<T extends PrincipalTables> = T['Session']['$inferSelect']['id'];
/** The principal's user: the core columns plus the exposed ones, with the table's own types. */
export type UserRow<D, T extends PrincipalTables> = Pick<T['User']['$inferSelect'], CoreUserKey | (ExposedFields<D> & keyof T['User']['$inferSelect'])>;
export type PrincipalSession<SId extends string = string> = {
    readonly id: SId;
    readonly createdAt: Date;
    readonly expiresAt: Date;
    readonly ipAddress: string | null;
    readonly userAgent: string | null;
};
/** How the request proved its session. */
export type PrincipalVia = 'cookie' | 'bearer';
export type Principal<U, SId extends string = string> = {
    readonly user: U;
    readonly session: PrincipalSession<SId>;
    readonly via: PrincipalVia;
    readonly roles: readonly string[];
    /** The selected workspace. A selection, not proof of membership: check membership where it matters. */
    readonly workspace?: {
        readonly activeOrganizationId: string | null;
        readonly activeTeamId: string | null;
    };
};
/** The least every principal carries. Guards accept any principal through this type. */
export type AnyPrincipal = Principal<{
    readonly id: string;
    readonly emailVerified: boolean;
}>;
/** The principal type an auth produces: `PrincipalOf<typeof auth>`. */
export type PrincipalOf<A> = A extends {
    readonly principal: (headers: Headers) => Promise<infer P | null>;
} ? P : never;
/** A request context that carries the principal, or `null` for a guest. */
export type AuthContext<A> = {
    readonly principal: PrincipalOf<A> | null;
};
/** The session id, checked to be a string. Its brand is the table's, which the engine wrote. */
export declare function isSessionId<SId extends string>(id: unknown): id is SId;
/** The user id, checked to be a string. Its brand is the table's, which the engine wrote. */
export declare function isUserId<UId extends string>(id: unknown): id is UId;
/** The engine's session row as the app sees it: no token. A missing id or date is `ARKI_AUTH_E004`. */
export declare function toPrincipalSession<SId extends string>(session: object): PrincipalSession<SId>;
/**
 * The engine's user as the app's row: the core columns and the exposed ones, nothing else. A
 * missing column is `ARKI_AUTH_E004`.
 */
export declare function toUserRow<U>(engineUser: object, fields: readonly string[]): U;
export type ToPrincipalInput = {
    /** The engine's user object. */
    readonly user: object;
    /** The engine's session object. */
    readonly session: object;
    /** The exposed extra columns. Only these and the core columns reach the principal. */
    readonly fields: readonly string[];
    readonly via: PrincipalVia;
    /** Read `activeOrganizationId` / `activeTeamId` from the session. */
    readonly workspaces: boolean;
};
/**
 * Builds the principal from the engine's session. Keeps only the core and the exposed columns, so
 * a column the definition does not expose never reaches a handler or the browser. A missing core
 * or exposed column is `ARKI_AUTH_E004`. `roles` runs on the narrowed user; its failure is thrown,
 * never turned into a guest.
 */
export declare function toPrincipal<U, SId extends string>(input: ToPrincipalInput, roles: (user: U) => readonly string[] | Promise<readonly string[]>): Promise<Principal<U, SId>>;
//# sourceMappingURL=principal.d.ts.map