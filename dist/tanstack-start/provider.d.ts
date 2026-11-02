import type { AuthUIProviderProps } from '@daveyplate/better-auth-ui';
import type { ReactNode } from 'react';
import type { AuthCapabilities } from '../react/capabilities.js';
import type { UserChangeHandler } from './user-change.js';
/**
 * `capabilities` (from `createAuthClient(definition).capabilities`) decides which sign-in methods
 * the auth screens offer, so they never show a method the server refuses.
 *
 * `onUserChange` gets the signed-in user's id, or `null` when signed out, each time that
 * changes: on sign-in, sign-out, and a new session that replaced another user's. It is never
 * called while the session is still loading or failed to load, and not twice in a row for the
 * same user while the provider stays mounted. Use it for per-user cleanup, such as dropping
 * the previous user's offline caches. With `disabled` there is no session and it is never called.
 */
export declare function ArkiAuthProvider({ children, authClient, capabilities, disabled, onUserChange, ...props }: AuthUIProviderProps & {
    children: ReactNode;
    disabled?: boolean;
    capabilities: AuthCapabilities;
    onUserChange?: UserChangeHandler;
}): import("react").JSX.Element;
//# sourceMappingURL=provider.d.ts.map