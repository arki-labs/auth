/** What the route needs from an auth: test sign-in by email (every `Auth` has it). */
export type E2EAuth = {
    readonly testing: {
        readonly signIn: (user: {
            readonly email: string;
        }, options?: {
            readonly password?: string;
        }) => Promise<{
            readonly headers: Headers;
        }>;
    };
};
export type CreateE2EHandlerOptions = {
    readonly auth: E2EAuth;
    /** `true` only in an explicit test mode. Default `false`: every request answers 404. */
    readonly enabled?: boolean;
    /** The address used when the body names none. */
    readonly defaultEmail: string;
    /**
     * Addresses this route may sign in. Default: only the reserved `.test` top-level domain
     * (RFC 2606), so a real person's account can never be reached.
     */
    readonly allowEmail?: (email: string) => boolean;
    /**
     * When set, the signed-in user's password becomes this one, so form-driven specs can sign in
     * with it too. Needs the `password` method.
     */
    readonly password?: string;
};
export declare function createE2EHandler(options: CreateE2EHandlerOptions): ({ request }: {
    readonly request: Request;
}) => Promise<Response>;
//# sourceMappingURL=tanstack-start.d.ts.map