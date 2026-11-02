import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@arki/ui/card';
import { Envelope } from '@arki/icons/phosphor';
export function VerifyRequestTemplate() {
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full", children: _jsx(Envelope, { className: "h-6 w-6" }) }), _jsx(CardTitle, { className: "mt-4 text-center text-2xl font-bold", children: "Check your email" }), _jsx(CardDescription, { className: "text-center", children: "A sign in link has been sent to your email address." })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground text-center", children: "Click the link in the email to sign in or continue with your account creation." }) })] }) }));
}
//# sourceMappingURL=verify-request.template.js.map