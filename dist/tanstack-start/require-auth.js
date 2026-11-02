/**
 * Builds a `beforeLoad`-compatible auth guard backed by the supplied SSR
 * session prefetch function.
 *
 * The session is resolved through a `createServerFn` server function (the one
 * the caller passes in) — this is the only way to read the incoming request's
 * cookies on the server during SSR. Using the React `authClient.getSession()`
 * here would silently always return `null` on cold loads, since it has no
 * access to the request headers.
 *
 * @example
 * beforeLoad: ({ location }) =>
 *   createRequireAuth(prefetchSessionFn, () => redirect({ to: '/sign-in', search: { redirect: location.href } }))(),
 */
export function createRequireAuth(prefetchSessionFn, signIn) {
    return async function requireAuth() {
        const session = await prefetchSessionFn();
        if (!session) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error -- TanStack Router redirect is thrown by design
            throw signIn();
        }
    };
}
//# sourceMappingURL=require-auth.js.map