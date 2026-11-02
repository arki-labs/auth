import type { AuthMethod } from '../definition.js';
import type { AuthEvents, SignInFailure } from './types.js';
/** Where the engine's routes are mounted. */
export declare const AUTH_BASE_PATH = "/api/auth";
/** The engine route below the base path: `/sign-in/email`, `/callback/google`, … */
export declare function enginePath(request: Request): string;
/** The method a route signs in with, when it is a sign-in (or sign-up) route. */
export declare function signInMethodOf(path: string, methods: readonly AuthMethod[]): AuthMethod | undefined;
/**
 * The method of an id-token sign-in: `/sign-in/social` with an `idToken` in the body. It signs in
 * (and may create the user) in place, with the provider named in the body, not the path.
 */
export declare function idTokenMethodOf(path: string, body: unknown, methods: readonly AuthMethod[]): AuthMethod | undefined;
/** The method behind a user creation, from the engine's provisioning source. */
export declare function methodOfSource(source: {
    readonly method: string;
    readonly oauth?: {
        readonly providerId: string;
    };
}): "apple" | "facebook" | "github" | "google" | "magicLink" | "microsoft" | "password" | undefined;
/** Why a sign-in answer failed. */
export declare function failureOf(response: Response): Promise<SignInFailure | undefined>;
/** Generation failure suppresses only observation, never a completed business response. */
export declare function requestIdOf(headers: Headers): import("@arki/contracts").IdGenerationFailure | (string & import("zod").$brand<"auth.request">);
type Events<P, U> = Required<AuthEvents<P, U>>;
type EventOf<P, U, K extends keyof Events<P, U>> = Parameters<Events<P, U>[K]>[0];
/** Calls one observer, logs its failure, never throws. */
export declare function runObserver(name: string, call: () => void | Promise<void> | undefined): Promise<void>;
/** One emitter per event. */
export declare function createEmitter<P, U>(on: AuthEvents<P, U> | undefined): {
    userCreated: (event: EventOf<P, U, 'userCreated'>) => Promise<void>;
    signIn: (event: EventOf<P, U, 'signIn'>) => Promise<void>;
    signInFailed: (event: EventOf<P, U, 'signInFailed'>) => Promise<void>;
    passwordChanged: (event: EventOf<P, U, 'passwordChanged'>) => Promise<void>;
    signOut: (event: EventOf<P, U, 'signOut'>) => Promise<void>;
};
export {};
//# sourceMappingURL=events.d.ts.map