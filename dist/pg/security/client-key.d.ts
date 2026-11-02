import { z } from 'zod';
/** The one header the engine reads the client key from when no `clientIp.header` is configured. */
export declare const CLIENT_KEY_HEADER = "x-arki-auth-client-key";
/** Set to `account` when {@link CLIENT_KEY_HEADER} holds an account key, not a client address. */
export declare const CLIENT_KEY_KIND_HEADER = "x-arki-auth-client-key-kind";
/**
 * The endpoints whose account is the body `email`: sign-in with a password, the password-reset
 * request, magic-link sign-in. The engine here has no email-OTP endpoints. Every other endpoint
 * ignores the body email for the rate-limit key.
 */
export declare const EMAIL_ACCOUNT_PATHS: ReadonlySet<string>;
/** The runtime check of `runtime().clientIp` (`ClientIpSource` is the source type): a header or the socket, never both. */
export declare const clientIpSchema: z.ZodUnion<readonly [z.ZodReadonly<z.ZodObject<{
    header: z.ZodString;
    from: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>>, z.ZodReadonly<z.ZodObject<{
    from: z.ZodLiteral<"socket">;
    header: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>>]>;
/** The socket address the runtime put on the request, if any. */
export declare function socketAddressOf(request: Request): string | undefined;
/** The private IPv6 address that stands for an account in the engine's rate-limit key. */
export declare function accountKeyAddress(account: string): Promise<string>;
/** Copies `headers` without the two client-key headers, whatever a caller put there. */
export declare function withoutClientKey(headers: Headers): Headers;
/** A request without the client-key headers a caller sent; the same request when it sent none. */
export declare function withoutCallerClientKey(request: Request): Promise<Request>;
/** What the handler needs to key a request: its engine path and the signed-in user, if any. */
export type ClientKeyInput = {
    readonly path: string;
    /** The signed-in user's id; called only when the request carries a credential. */
    readonly userIdOf: (headers: Headers) => Promise<string | undefined>;
};
/**
 * The request the engine sees when no `clientIp.header` is configured, with its client key set as
 * described at the top of this file. The caller checks first that a required socket address is
 * there ({@link socketAddressOf}).
 */
export declare function withClientKey(request: Request, { path, userIdOf }: ClientKeyInput): Promise<Request>;
//# sourceMappingURL=client-key.d.ts.map