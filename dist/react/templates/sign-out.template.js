import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@arki/ui/card';
import { CircleNotch } from '@arki/icons/phosphor';
export function SignOutTemplate() {
    return (_jsx("div", { className: "justify-cente flex min-h-screen items-center", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-center text-2xl font-bold", children: "Signing Out" }) }), _jsxs(CardContent, { className: "flex flex-col items-center", children: [_jsx(CircleNotch, { className: "h-8 w-8 animate-spin" }), _jsx("p", { className: "mt-4 text-center", children: "Please wait while you are being logged out..." })] })] }) }));
}
//# sourceMappingURL=sign-out.template.js.map