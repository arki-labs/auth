/** Gets the signed-in user's id, or `null` once the session is known to be signed out. */
export type UserChangeHandler = (userId: string | null) => void;
/**
 * Call `onUserChange` each time `userId` changes.
 *
 * `undefined` means nobody knows yet who is signed in (the session is loading, or loading it
 * failed), so nothing is reported: a page that has not learned the user must not act as if the
 * user signed out. The same user is reported only once while the caller stays mounted.
 */
export declare function useUserChange(userId: string | null | undefined, onUserChange: UserChangeHandler): void;
//# sourceMappingURL=user-change.d.ts.map