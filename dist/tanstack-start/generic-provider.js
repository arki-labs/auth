'use client';
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack';
import { AuthUIProviderTanstack } from '@daveyplate/better-auth-ui/tanstack';
/** The fallback for a navigation hook that has no router to call: it does nothing. */
const noop = () => {
    // Nothing to do without a router.
};
/**
 * Default Image component that wraps native img element.
 * Validates src before rendering to prevent errors with empty/null values.
 * Returns null to allow AvatarFallback to display instead.
 */
function DefaultImage({ src, alt, width, height, className, ...props }) {
    // Don't render if src is empty/invalid
    if (!src || src === '') {
        return null;
    }
    return _jsx("img", { src: src, alt: alt, width: width, height: height, className: className, ...props });
}
/**
 * Default Link component that wraps native anchor element.
 * For proper SPA navigation, pass your router's Link component.
 */
function DefaultLink({ href, children, className, ...props }) {
    return (_jsx("a", { href: href, className: className, ...props, children: children }));
}
/**
 * Hook that defers router access until after hydration.
 * Uses window.location for navigation - framework agnostic.
 */
function useDeferredRouter() {
    const [router, setRouter] = useState(null);
    useEffect(() => {
        // Create a router-like object that uses window.location
        // This runs only on client after hydration
        setRouter({
            push: (url) => {
                window.location.href = url;
            },
            replace: (url) => {
                window.location.replace(url);
            },
            refresh: () => {
                window.location.reload();
            },
            back: () => {
                window.history.back();
            },
            forward: () => {
                window.history.forward();
            },
            prefetch: noop,
        });
    }, []);
    return router;
}
/**
 * TanStack Start-compatible auth provider for better-auth.
 *
 * This provider is framework-agnostic and works with TanStack Start, Vite, or any React app.
 * Pass your router's Link component and optionally a custom Image component for optimal integration.
 *
 * @example
 * ```tsx
 * import { Link } from '@tanstack/react-router';
 * import { TanStackAuthProvider } from '@arki/auth/tanstack-start';
 * import { authClient } from './auth/client';
 *
 * function Providers({ children }) {
 *   return (
 *     <TanStackAuthProvider
 *       authClient={authClient}
 *       LinkComponent={Link}
 *     >
 *       {children}
 *     </TanStackAuthProvider>
 *   );
 * }
 * ```
 */
export function TanStackAuthProvider({ children, authClient, disabled = false, LinkComponent = DefaultLink, ImageComponent = DefaultImage, navigate: customNavigate, replace: customReplace, refresh: customRefresh, ...props }) {
    const router = useDeferredRouter();
    // If authentication is disabled, render children without auth provider
    if (disabled) {
        return _jsx(_Fragment, { children: children });
    }
    // Use custom functions or fall back to deferred router
    const navigate = customNavigate ?? router?.push ?? noop;
    const replace = customReplace ?? router?.replace ?? noop;
    const refresh = customRefresh ?? router?.refresh ?? noop;
    // Create a safe Image wrapper component
    const SafeImageComponent = ({ src, ...imageProps }) => {
        if (!src || src === '') {
            return null;
        }
        return _jsx(ImageComponent, { src: src, ...imageProps });
    };
    return (_jsx(AuthQueryProvider, { children: _jsx(AuthUIProviderTanstack, { authClient: authClient, navigate: navigate, persistClient: false, replace: replace, onSessionChange: () => {
                // Clear router cache (protected routes)
                refresh();
            }, Link: LinkComponent, avatar: {
                Image: SafeImageComponent,
            }, deleteUser: {
                verification: true,
            }, magicLink: true, optimistic: true, emailVerification: true, credentials: true, account: true, social: {
                providers: ['google', 'facebook'],
            }, ...props, children: children }) }));
}
//# sourceMappingURL=generic-provider.js.map