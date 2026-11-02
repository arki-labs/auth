import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from '@tanstack/react-router';
import { Button } from '@arki/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@arki/ui/card';
import { WarningCircle } from '@arki/icons/phosphor';
export function AuthErrorPageTemplate({ error }) {
    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'Configuration': {
                return 'There is a problem with the server configuration. Please try again later.';
            }
            case 'AccessDenied': {
                return 'Access denied. You do not have permission to sign in.';
            }
            case 'Verification': {
                return 'The verification token has expired or has already been used.';
            }
            default: {
                return 'An unexpected error occurred. Please try again.';
            }
        }
    };
    const errorMessage = error ? getErrorMessage(error) : 'An authentication error occurred.';
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "bg-destructive mx-auto flex h-12 w-12 items-center justify-center rounded-full", children: _jsx(WarningCircle, { className: "text-destructive-foreground h-6 w-6" }) }), _jsx(CardTitle, { className: "mt-4 text-center text-2xl font-bold", children: "Authentication Error" }), _jsx(CardDescription, { className: "text-center", children: "We encountered a problem while trying to authenticate you." })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground text-center", children: errorMessage }) }), _jsx(CardFooter, { className: "flex justify-center", children: _jsx(Button, { asChild: true, children: _jsx(Link, { to: "/sign-in", children: "Return to Sign In" }) }) })] }) }));
}
//# sourceMappingURL=auth-error.template.js.map