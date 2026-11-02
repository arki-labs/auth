import type { Mailer } from '@arki/mail';
import type { AuthLinkInputSchema, AuthMailBrandPicker, AuthTemplates } from './types.js';
/** How long each link lives, in minutes. */
export declare const LINK_MINUTES: {
    readonly magicLink: 5;
    readonly resetPassword: 15;
    readonly verifyEmail: 60;
};
export type AuthMailKind = keyof AuthTemplates;
export type AuthMail = {
    /** `request` is the one that asked for the mail; it picks the brand when `brand` is bound. */
    send(kind: AuthMailKind, to: string, url: string, request?: Request): Promise<void>;
};
/**
 * The input schema for a custom auth link template that renders the brand's site: the
 * `@arki/mail/templates/auth` link rules (`appName`, `url`, `expiresInMinutes`), plus an optional
 * absolute http(s) `appUrl`. The default templates use their own schema, which drops `appUrl`.
 *
 * @example
 * defineTemplate({ name: magicLink.name, input: authLinkInput, subject: ..., html: data => page(data.appUrl) });
 */
export declare const authLinkInput: AuthLinkInputSchema;
export declare function authMail(options: {
    readonly mail: Pick<Mailer, 'send'>;
    readonly templates: Partial<AuthTemplates> | undefined;
    readonly appName: string;
    readonly brand: AuthMailBrandPicker | undefined;
}): AuthMail;
//# sourceMappingURL=mail.d.ts.map