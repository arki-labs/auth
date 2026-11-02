import { z } from '@arki/contracts';
import { accountId, authRequestId, organizationId, sessionId, teamId, userId, verificationId, } from './id-declarations.js';
/** A schema that takes a string and gives the declaration's id type, or fails with the prefix it wanted. */
function idSchema(declaration) {
    return z.string().transform((value, context) => {
        if (declaration.is(value))
            return value;
        context.addIssue({ code: 'custom', message: `Expected an id starting with "${declaration.prefix}"` });
        return z.NEVER;
    });
}
/** Restore an inbound correlation identity without changing its stored format. */
export const authRequestIdSchema = z.string().pipe(authRequestId.schema);
export const userIdSchema = idSchema(userId);
export const sessionIdSchema = idSchema(sessionId);
export const accountIdSchema = idSchema(accountId);
export const verificationIdSchema = idSchema(verificationId);
export const organizationIdSchema = idSchema(organizationId);
export const teamIdSchema = idSchema(teamId);
/** An email address. */
export const emailSchema = z.email();
//# sourceMappingURL=zod.js.map