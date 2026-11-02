import type { AuthUIProviderProps } from '@daveyplate/better-auth-ui';
import type { ComponentType, ReactNode } from 'react';
/**
 * Props for a framework-agnostic Link component
 */
export type LinkComponentProps = {
    href: string;
    children: ReactNode;
    className?: string;
    [key: string]: unknown;
};
/**
 * Props for a framework-agnostic Image component
 */
export type ImageComponentProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    [key: string]: unknown;
};
export type TanStackAuthProviderProps = {
    children: ReactNode;
    /**
     * Whether to disable authentication entirely.
     * When true, children are rendered without auth providers.
     */
    disabled?: boolean;
    /**
     * Link component for navigation (e.g., from @tanstack/react-router).
     * Defaults to native anchor element.
     */
    LinkComponent?: ComponentType<LinkComponentProps>;
    /**
     * Image component for avatars.
     * Defaults to native img element with validation.
     */
    ImageComponent?: ComponentType<ImageComponentProps>;
    /**
     * Custom navigate function. If not provided, uses window.location.href.
     */
    navigate?: (url: string) => void;
    /**
     * Custom replace function. If not provided, uses window.location.replace.
     */
    replace?: (url: string) => void;
    /**
     * Custom refresh function. If not provided, uses window.location.reload.
     */
    refresh?: () => void;
} & Omit<AuthUIProviderProps, 'Link' | 'avatar'>;
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
export declare function TanStackAuthProvider({ children, authClient, disabled, LinkComponent, ImageComponent, navigate: customNavigate, replace: customReplace, refresh: customRefresh, ...props }: TanStackAuthProviderProps): import("react").JSX.Element;
//# sourceMappingURL=generic-provider.d.ts.map