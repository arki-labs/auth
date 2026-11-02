import { useEffect, useRef } from 'react';
/**
 * Call `onUserChange` each time `userId` changes.
 *
 * `undefined` means nobody knows yet who is signed in (the session is loading, or loading it
 * failed), so nothing is reported: a page that has not learned the user must not act as if the
 * user signed out. The same user is reported only once while the caller stays mounted.
 */
export function useUserChange(userId, onUserChange) {
    // `undefined` until the first report; `userId` is never `undefined` when it is compared.
    const reported = useRef(undefined);
    useEffect(() => {
        if (userId === undefined || reported.current === userId)
            return;
        reported.current = userId;
        onUserChange(userId);
    }, [userId, onUserChange]);
}
//# sourceMappingURL=user-change.js.map