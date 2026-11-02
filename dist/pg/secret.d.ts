/**
 * Refuses a missing or short secret in production (`ARKI_AUTH_E002`). The secret signs session
 * cookies and tokens; a short or leaked one lets an attacker forge a session for any user. Better
 * Auth only warns, so this turns the warning into an error. Outside production any secret passes,
 * so local dev and tests can use their own.
 */
export declare function assertAuthSecret(secret: string | undefined, production: boolean): void;
//# sourceMappingURL=secret.d.ts.map