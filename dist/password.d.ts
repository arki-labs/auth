/** Hash a password. Returns `<salt hex>:<key hex>`, safe to store as-is. */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Check a password against a stored hash. Returns `false` for a wrong password
 * and for a hash that is empty or not in the expected format. Never throws.
 */
export declare function verifyPassword({ hash, password }: {
    hash: string;
    password: string;
}): Promise<boolean>;
//# sourceMappingURL=password.d.ts.map