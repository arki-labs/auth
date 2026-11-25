/** Social sign-in providers. Their credentials are runtime values, given to the server factory. */
export declare const SOCIAL_METHODS: readonly ['google', 'apple', 'facebook', 'microsoft', 'github'];
export type SocialMethod = (typeof SOCIAL_METHODS)[number];
/**
 * Social methods whose id tokens the engine can verify, so a native app can sign in with the token
 * its platform SDK returned (`auth.signInWithIdToken`). GitHub has no id tokens.
 */
export declare const ID_TOKEN_METHODS: readonly ["google", "apple", "facebook", "microsoft"];
export type IdTokenMethod = (typeof ID_TOKEN_METHODS)[number];
/**
 * Every sign-in method. `passkey` signs an existing user in with the device's own unlock (face,
 * fingerprint, PIN); a user adds a passkey while signed in. Email OTP is later work.
 */
export declare const AUTH_METHODS: readonly ["password", "magicLink", "passkey", "google", "apple", "facebook", "microsoft", "github"];
export type AuthMethod = (typeof AUTH_METHODS)[number];
/** A duration in whole seconds. */
export type Seconds = number;
/**
 * What happens to a password sign-up's email address.
 *
 * - `'require'` (default): a verify link is sent and password sign-in waits until it is used.
 * - `'send'`: the link is sent, sign-in works before it is used.
 * - `'none'`: no link is sent.
 */
export type VerifyEmailMode = 'none' | 'send' | 'require';
/**
 * Passkey options. `rpName` is the name the device shows when it asks to save the passkey. The
 * relying party id and the expected origin come from the auth's `runtime.url`.
 */
export type PasskeyOptions = {
    readonly rpName: string;
};
/** Organizations (workspaces). `teams: true` adds teams inside each workspace. */
export type WorkspacesOption = {
    readonly teams: boolean;
};
/**
 * Account self-service. Each switch is off unless set to `true`.
 *
 * - `changeEmail`: the user can change their address. A verify link goes to the new address
 *   (the `verifyEmail` mail); the address changes only when that link is used.
 * - `linking`: social accounts can be linked to a signed-in user, and a social sign-in with an
 *   address the provider verified joins the existing user. Off: neither happens.
 * - `delete`: the user can delete their account (a fresh session or the password is required).
 *   The user row and every session go; tables that point at the user need `onDelete: 'cascade'`.
 */
export type AccountOptions = {
    readonly changeEmail?: boolean;
    readonly linking?: boolean;
    readonly delete?: boolean;
};
/**
 * The auth declaration. `M` is the literal tuple of enabled methods; `F` names the extra columns
 * of the app's user table that the principal and the client may see. Types for those columns come
 * from the table, never from here. `W` is the `workspaces` value as written, so the client knows
 * from the type alone whether to add the organization API.
 */
export type AuthDefinition<M extends readonly AuthMethod[] = readonly AuthMethod[], F extends readonly string[] = readonly string[], W extends WorkspacesOption | undefined = WorkspacesOption | undefined> = {
    /** `name` appears in mail; `key` prefixes the cookies (`auth-<key>`). */
    readonly app: {
        readonly name: string;
        readonly key: string;
    };
    readonly methods: M;
    /** `fields`: extra user columns to expose (default none). `signUpFields`: those a client may set at sign-up. */
    readonly user?: {
        readonly fields?: F;
        readonly signUpFields?: readonly F[number][];
    };
    /** Default `'require'`. */
    readonly verifyEmail?: VerifyEmailMode;
    /**
     * Defaults: 7 days, refreshed at most once a day, no bearer tokens, no `freshFor`.
     *
     * `freshFor`: how many seconds after sign-in a session counts as fresh. The `freshSession` step
     * refuses an older session, and so do the engine's own sensitive routes (delete the account,
     * unlink an account, list sessions). Unset, those routes accept a session up to one day old and
     * `freshSession` throws `ARKI_AUTH_E001`.
     */
    readonly sessions?: {
        readonly expiresIn?: Seconds;
        readonly refreshEvery?: Seconds;
        readonly bearer?: boolean;
        readonly freshFor?: Seconds;
    };
    /** `signUp: false` makes magic links sign-in only. Default `true`. */
    readonly magicLink?: {
        readonly signUp?: boolean;
    };
    /** Required when `methods` lists `passkey`, refused otherwise. */
    readonly passkey?: PasskeyOptions;
    /** Organizations (workspaces), optionally with teams. Needs the workspace tables. */
    readonly workspaces?: W;
    /** Account self-service: change email, link accounts, delete the account. All off by default. */
    readonly account?: AccountOptions;
    /** Accept the Expo client (native apps). Default `false`. */
    readonly expo?: boolean;
};
/** The extra user column names a definition exposes. */
export type ExposedFields<D> = D extends {
    readonly user?: {
        readonly fields?: infer F;
    };
} ? F extends readonly string[] ? F[number] : never : never;
/** The social methods a definition enables. */
export type SocialMethodsOf<D> = D extends {
    readonly methods: infer M;
} ? M extends readonly AuthMethod[] ? Extract<M[number], SocialMethod> : never : never;
/** The social methods a definition enables whose id tokens the engine can verify. */
export type IdTokenMethodsOf<D> = Extract<SocialMethodsOf<D>, IdTokenMethod>;
/** A definition with every default filled in. */
export type ResolvedDefinition = {
    readonly app: {
        readonly name: string;
        readonly key: string;
    };
    readonly methods: readonly AuthMethod[];
    readonly fields: readonly string[];
    readonly signUpFields: readonly string[];
    readonly verifyEmail: VerifyEmailMode;
    readonly sessions: {
        readonly expiresIn: Seconds;
        readonly refreshEvery: Seconds;
        readonly bearer: boolean;
        readonly freshFor: Seconds | undefined;
    };
    readonly magicLink: {
        readonly signUp: boolean;
    };
    readonly passkey: PasskeyOptions | undefined;
    readonly workspaces: WorkspacesOption | undefined;
    readonly account: {
        readonly changeEmail: boolean;
        readonly linking: boolean;
        readonly delete: boolean;
    };
    readonly expo: boolean;
};
export declare const isSocialMethod: (value: string) => value is SocialMethod;
export declare const isIdTokenMethod: (value: string) => value is IdTokenMethod;
/**
 * Checks a definition and fills its defaults. Throws `ARKI_AUTH_E001` on the first mistake.
 * The factory calls it again, so a hand-written object gets the same checks.
 */
export declare function resolveDefinition(definition: AuthDefinition): ResolvedDefinition;
/**
 * `passkey` options are required when `methods` is a written list that names `passkey`. A list
 * typed only as an array (built at run time) is checked when the definition is resolved instead.
 */
export type PasskeyOptionsFor<M extends readonly AuthMethod[]> = number extends M['length'] ? unknown : 'passkey' extends M[number] ? {
    readonly passkey: PasskeyOptions;
} : unknown;
/**
 * Declares the app's auth. Returns the definition unchanged after checking it; the point is the
 * literal types: `methods` and `user.fields` keep their exact names for the server, the client and
 * the principal, and `workspaces` stays as written for the client.
 */
export declare function defineAuth<const M extends readonly AuthMethod[], const F extends readonly string[] = readonly [], const W extends WorkspacesOption | undefined = undefined>(definition: AuthDefinition<M, F, W> & PasskeyOptionsFor<M>): AuthDefinition<M, F, W>;
//# sourceMappingURL=definition.d.ts.map