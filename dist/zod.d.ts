import { z } from '@arki/contracts';
/** Restore an inbound correlation identity without changing its stored format. */
export declare const authRequestIdSchema: z.ZodPipe<z.ZodString, z.core.$ZodBranded<z.ZodTemplateLiteral<string>, "auth.request", "out">>;
export declare const userIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`usr_${string}`, string>>;
export declare const sessionIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`sess_${string}`, string>>;
export declare const accountIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`acc_${string}`, string>>;
export declare const verificationIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`verif_${string}`, string>>;
export declare const organizationIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`organization_${string}`, string>>;
export declare const teamIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<`team_${string}`, string>>;
/** An email address. */
export declare const emailSchema: z.ZodEmail;
//# sourceMappingURL=zod.d.ts.map