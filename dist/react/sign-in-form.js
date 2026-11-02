'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { isFailure } from '@arki/failure';
import { AppleLogo, CheckCircle, CircleNotch, EnvelopeSimpleOpen, FacebookLogo, GithubLogo, GoogleLogo, WindowsLogo, } from '@arki/icons/phosphor';
import { Button } from '@arki/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@arki/ui/card';
import { cn } from '@arki/ui/cn';
import { Input } from '@arki/ui/input';
import { Label } from '@arki/ui/label';
import { SignInRefused } from '../boundary-failures.js';
import { authCapabilities } from './capabilities.js';
const DEFAULT_LOCALIZATION = {
    title: 'Sign in',
    description: '',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    emailRequired: 'Enter your email address.',
    password: 'Password',
    passwordPlaceholder: '••••••••',
    magicLinkAction: 'Send sign-in link',
    passwordAction: 'Sign in',
    usePasswordToggle: 'Sign in with password',
    useMagicLinkToggle: 'Sign in with magic link',
    signInWith: 'Sign in with',
    orContinueWith: 'or continue with',
    forgotPassword: 'Forgot password?',
    magicLinkSentTitle: 'Check your inbox',
    magicLinkSentDescription: 'We sent a sign-in link to {email}.',
    magicLinkResendPrompt: "Didn't get it?",
    magicLinkResendCountdown: 'Resend in {seconds}s',
    magicLinkResendAction: 'Resend link',
    magicLinkResentConfirmation: 'Sent again — give it a minute to arrive.',
    changeEmailPrompt: 'Wrong email?',
    changeEmailAction: 'Change it',
    genericError: 'Something went wrong. Please try again.',
    credentialsError: 'Check your details and try again.',
    unverifiedError: 'Verify your email address first. Check your inbox for the link.',
    rateLimitedError: 'Too many attempts. Wait a moment and try again.',
};
const SOCIAL_PROVIDERS = {
    google: { label: 'Google', Icon: GoogleLogo },
    apple: { label: 'Apple', Icon: AppleLogo },
    microsoft: { label: 'Microsoft', Icon: WindowsLogo },
    facebook: { label: 'Facebook', Icon: FacebookLogo },
    github: { label: 'GitHub', Icon: GithubLogo },
};
/** Cooldown before a magic link can be resent, mirroring the design prototype. */
const RESEND_COOLDOWN_SECONDS = 30;
/** Renders a "…{email}…" template with the address emphasised inline. */
function renderSentDescription(template, email) {
    const parts = template.split('{email}');
    if (parts.length === 1)
        return template;
    return parts.map((part, index) => (_jsxs("span", { children: [part, index < parts.length - 1 ? _jsx("strong", { className: "font-medium text-foreground", children: email }) : null] }, index)));
}
function Spinner() {
    return _jsx(CircleNotch, { className: "size-4 animate-spin", "aria-hidden": true });
}
export function SignInForm({ handlers, localization, initialMode, forgotPasswordTo, header, footer, className, definition, }) {
    const l = { ...DEFAULT_LOCALIZATION, ...localization };
    const methods = authCapabilities(definition);
    const canMagicLink = methods.magicLink;
    const canPassword = methods.password;
    const bothModes = canMagicLink && canPassword;
    const defaultMode = (initialMode && (initialMode === 'password' ? canPassword : canMagicLink) ? initialMode : undefined) ??
        (canMagicLink ? 'magic-link' : 'password');
    const [mode, setMode] = useState(defaultMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [socialPending, setSocialPending] = useState(null);
    const [resendIn, setResendIn] = useState(0);
    const [resent, setResent] = useState(false);
    const sentHeadingRef = useRef(null);
    const passwordId = 'sign-in-password';
    const emailId = 'sign-in-email';
    const passwordOpen = mode === 'password' && canPassword;
    const busy = status === 'submitting' || status === 'social';
    const hasEmailAuth = canMagicLink || canPassword;
    function resolveErrorMessage(err) {
        return err instanceof Error && err.message ? err.message : l.genericError;
    }
    /** The text for a refusal a handler returned: by its reason, never the server's own words. */
    function refusalMessage(refusal) {
        const messages = {
            credentials: l.credentialsError,
            unverified: l.unverifiedError,
            rateLimited: l.rateLimitedError,
            unknown: l.genericError,
        };
        return messages[refusal.data.reason];
    }
    // Tick the resend cooldown down while the "check your inbox" state is shown.
    useEffect(() => {
        if (status !== 'sent' || resent || resendIn <= 0)
            return;
        const timer = setTimeout(() => setResendIn(seconds => seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [status, resent, resendIn]);
    // Move focus to the confirmation heading so the state change is announced.
    useEffect(() => {
        if (status === 'sent')
            sentHeadingRef.current?.focus();
    }, [status]);
    function switchMode(next) {
        if (busy)
            return;
        setError(null);
        setMode(next);
        if (next === 'password') {
            requestAnimationFrame(() => document.querySelector(`#${passwordId}`)?.focus());
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (busy)
            return;
        setError(null);
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError(l.emailRequired);
            return;
        }
        try {
            setStatus('submitting');
            if (mode === 'password' && canPassword) {
                const refused = await handlers.onPasswordSignIn(trimmedEmail, password);
                if (isFailure(refused)) {
                    setError(refusalMessage(refused));
                    setStatus('idle');
                }
                // On success the handler navigates away; keep the button busy.
                return;
            }
            const refused = await handlers.onMagicLink(trimmedEmail);
            if (isFailure(refused)) {
                setError(refusalMessage(refused));
                setStatus('idle');
                return;
            }
            setResent(false);
            setResendIn(RESEND_COOLDOWN_SECONDS);
            setStatus('sent');
        }
        catch (error_) {
            setError(resolveErrorMessage(error_));
            setStatus('idle');
        }
    }
    async function handleSocial(provider) {
        if (busy)
            return;
        setError(null);
        try {
            setStatus('social');
            setSocialPending(provider);
            const refused = await handlers.onSocialSignIn(provider);
            if (isFailure(refused)) {
                setError(refusalMessage(refused));
                setStatus('idle');
                setSocialPending(null);
            }
        }
        catch (error_) {
            setError(resolveErrorMessage(error_));
            setStatus('idle');
            setSocialPending(null);
        }
    }
    function resetToForm() {
        setStatus('idle');
        setError(null);
        setPassword('');
        setResent(false);
        setResendIn(0);
    }
    async function handleResend() {
        try {
            const refused = await handlers.onMagicLink(email.trim());
            if (isFailure(refused)) {
                setError(refusalMessage(refused));
                return;
            }
            setResent(true);
        }
        catch (error_) {
            setError(resolveErrorMessage(error_));
        }
    }
    const primaryLabel = mode === 'password' ? l.passwordAction : l.magicLinkAction;
    return (_jsxs(Card, { className: cn('w-full', className), children: [status === 'sent' ? null : (_jsx(CardHeader, { children: header ?? (_jsxs(_Fragment, { children: [_jsx(CardTitle, { children: l.title }), l.description ? _jsx(CardDescription, { children: l.description }) : null] })) })), _jsxs(CardContent, { className: "flex flex-col gap-4", children: [status === 'sent' ? (_jsxs("div", { className: "flex flex-col items-center gap-4 py-4 text-center", role: "status", "data-slot": "auth-sent", children: [_jsx("span", { className: "flex size-16 items-center justify-center text-foreground", "data-slot": "auth-sent-glyph", "aria-hidden": true, children: _jsx(EnvelopeSimpleOpen, { className: "size-11" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { ref: sentHeadingRef, tabIndex: -1, className: "text-2xl font-semibold tracking-tight outline-none", "data-slot": "auth-sent-title", children: l.magicLinkSentTitle }), _jsx("p", { className: "mx-auto max-w-[38ch] text-sm text-muted-foreground", "data-slot": "auth-sent-body", children: renderSentDescription(l.magicLinkSentDescription, email.trim()) })] }), _jsxs("div", { className: "flex flex-col items-center gap-2.5 text-sm text-muted-foreground", "data-slot": "auth-sent-meta", children: [resent ? (_jsxs("span", { className: "inline-flex items-center gap-1.5", "data-slot": "auth-sent-resent", children: [_jsx(CheckCircle, { className: "size-4 text-primary", weight: "fill", "aria-hidden": true }), l.magicLinkResentConfirmation] })) : resendIn > 0 ? (_jsxs("span", { children: [l.magicLinkResendPrompt, ' ', _jsx("span", { className: "tabular-nums", children: l.magicLinkResendCountdown.replace('{seconds}', String(resendIn)) })] })) : (_jsxs("span", { children: [l.magicLinkResendPrompt, ' ', _jsx("button", { type: "button", className: "font-medium underline underline-offset-2 transition-opacity hover:opacity-70", "data-slot": "auth-sent-link", onClick: handleResend, children: l.magicLinkResendAction })] })), _jsxs("span", { children: [l.changeEmailPrompt, ' ', _jsx("button", { type: "button", className: "font-medium underline underline-offset-2 transition-opacity hover:opacity-70", "data-slot": "auth-sent-link", onClick: resetToForm, children: l.changeEmailAction })] })] })] })) : (_jsxs(_Fragment, { children: [error ? (_jsx("p", { role: "alert", className: "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error })) : null, hasEmailAuth ? (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", noValidate: true, children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: emailId, children: l.email }), _jsx(Input, { id: emailId, type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, placeholder: l.emailPlaceholder, value: email, disabled: busy, onChange: event => setEmail(event.target.value) })] }), canPassword ? (_jsx("div", { className: cn('grid transition-all duration-300 ease-out motion-reduce:transition-none', passwordOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'), children: _jsx("div", { className: "overflow-hidden", children: _jsxs("div", { className: "space-y-2 pt-px", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx(Label, { htmlFor: passwordId, children: l.password }), forgotPasswordTo ? (_jsx(Link, { to: forgotPasswordTo, tabIndex: passwordOpen ? 0 : -1, className: "text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline", children: l.forgotPassword })) : null] }), _jsx(Input, { id: passwordId, type: "password", autoComplete: "current-password", placeholder: l.passwordPlaceholder, value: password, disabled: !passwordOpen || busy, tabIndex: passwordOpen ? 0 : -1, "aria-hidden": !passwordOpen, onChange: event => setPassword(event.target.value) })] }) }) })) : null, _jsx(Button, { type: "submit", className: "w-full", size: "lg", disabled: busy, "aria-busy": status === 'submitting', children: status === 'submitting' ? _jsx(Spinner, {}) : primaryLabel }), bothModes ? (_jsx("div", { className: "text-center", children: mode === 'magic-link' ? (_jsx(Button, { type: "button", variant: "link", size: "sm", disabled: busy, onClick: () => switchMode('password'), children: l.usePasswordToggle })) : (_jsx(Button, { type: "button", variant: "link", size: "sm", disabled: busy, onClick: () => switchMode('magic-link'), children: l.useMagicLinkToggle })) })) : null] })) : null, methods.social.length > 0 ? (_jsxs(_Fragment, { children: [hasEmailAuth ? (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "h-px flex-1 bg-border" }), _jsx("span", { className: "text-xs text-muted-foreground", children: l.orContinueWith }), _jsx("span", { className: "h-px flex-1 bg-border" })] })) : null, _jsx("div", { className: "flex flex-col gap-2", children: methods.social.map(provider => {
                                            const meta = SOCIAL_PROVIDERS[provider];
                                            const Icon = meta.Icon;
                                            return (_jsxs(Button, { type: "button", variant: "outline", size: "lg", className: "w-full", disabled: busy, "aria-busy": socialPending === provider, onClick: () => handleSocial(provider), children: [socialPending === provider ? _jsx(Spinner, {}) : _jsx(Icon, { className: "size-4", "aria-hidden": true }), l.signInWith, " ", meta.label] }, provider));
                                        }) })] })) : null] })), footer ? _jsx("div", { className: "text-center text-sm text-muted-foreground", children: footer }) : null] })] }));
}
/** The reason a better-auth error means, from its HTTP status and code (the same map as the server's `failureOf`). */
function refusalReason(error) {
    if (error.status === 429)
        return 'rateLimited';
    if (error.status === 401)
        return 'credentials';
    if (error.status === 403 && error.code === 'EMAIL_NOT_VERIFIED')
        return 'unverified';
    return 'unknown';
}
/** `undefined` when the call succeeded, else the refusal for its error. */
function refusalOf(result) {
    return result.error ? SignInRefused({ reason: refusalReason(result.error) }) : undefined;
}
/**
 * Wires a better-auth client to {@link SignInHandlers}. Pass the result as
 * the `handlers` prop of {@link SignInForm}.
 */
export function createSignInHandlers(authClient, { redirectTo, onSignedIn }) {
    const signedIn = onSignedIn ?? (() => window.location.assign(redirectTo));
    return {
        onMagicLink: async (email) => {
            if (authClient.signIn.magicLink === undefined)
                throw new Error('Magic-link sign-in is not enabled.');
            return refusalOf(await authClient.signIn.magicLink({ email, callbackURL: redirectTo }));
        },
        onPasswordSignIn: async (email, password) => {
            const refused = refusalOf(await authClient.signIn.email({ email, password, callbackURL: redirectTo }));
            if (refused === undefined)
                signedIn();
            return refused;
        },
        onSocialSignIn: async (provider) => {
            return refusalOf(await authClient.signIn.social({ provider, callbackURL: redirectTo }));
        },
    };
}
//# sourceMappingURL=sign-in-form.js.map