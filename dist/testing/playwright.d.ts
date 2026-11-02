import type { Page } from '@playwright/test';
/**
 * Resolves to `<dir>/.auth/user.json` relative to the importing module file.
 * Used both by the globalSetup (write side) and the authenticated fixture
 * (read side). Pass the importing module's `import.meta.url` so the path
 * stays anchored to the caller's e2e folder, not the @arki package itself.
 */
export declare function resolveAuthStatePath(importMetaUrl: string, subdir?: string, filename?: string): string;
export type CreateAuthGlobalSetupOptions = {
    /** Origin of the app under test, e.g. `http://localhost:5180`. */
    baseUrl: string;
    /** Absolute path where storageState will be written. */
    authStatePath: string;
    /** POST endpoint that mints a session cookie. Default: `/api/e2e/create-session`. */
    createSessionPath?: string;
    /** Test user email. Forwarded to the endpoint as `{ email }`. */
    email: string;
};
/**
 * Builds a Playwright `globalSetup` default export.
 *
 * Boots a Chromium context, hits the app's test-only `/api/e2e/create-session`
 * endpoint to mint a session cookie, then persists the resulting storageState
 * to disk. The `authenticated` Playwright project (or the fixture below) loads
 * that file so individual tests skip the magic-link / sign-in flow.
 *
 * The endpoint is wired by `@arki/auth/tanstack-start`'s `createE2EHandler`
 * and is 404 in production. ESM `__dirname` plumbing is handled here, not in
 * the caller — pass an absolute `authStatePath` via `resolveAuthStatePath`.
 */
export declare function createAuthGlobalSetup({ baseUrl, authStatePath, createSessionPath, email, }: CreateAuthGlobalSetupOptions): () => Promise<void>;
export type AuthenticatedFixtures = {
    authenticatedPage: Page;
};
export type CreateAuthenticatedTestOptions = {
    /** Absolute path to the storageState JSON written by globalSetup. */
    authStatePath: string;
};
/**
 * Returns a Playwright `test` / `expect` pair with an `authenticatedPage`
 * fixture pre-loaded from the storageState file written by globalSetup.
 *
 * @example
 * import { createAuthenticatedTest, resolveAuthStatePath } from '@arki/auth/testing/playwright';
 * const { test, expect } = createAuthenticatedTest({
 *   authStatePath: resolveAuthStatePath(import.meta.url),
 * });
 * test('dashboard loads', async ({ authenticatedPage }) => { ... });
 */
export declare function createAuthenticatedTest({ authStatePath }: CreateAuthenticatedTestOptions): {
    test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & AuthenticatedFixtures, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
    expect: import("@playwright/test").Expect<{}>;
};
/**
 * Email + storageState path pair for the two accounts the fixture mints.
 * Use stable string keys (`a` / `b`) so spec code reads as a domain
 * statement (`pageA` is "the first authenticated account", not "the one
 * whose email starts with the lowest-alphabetic character").
 */
export type TwoAccountEmails = {
    a: string;
    b: string;
};
export type TwoAccountStatePaths = {
    a: string;
    b: string;
};
export type CreateTwoAccountGlobalSetupOptions = Omit<CreateAuthGlobalSetupOptions, 'email' | 'authStatePath'> & {
    emails: TwoAccountEmails;
    authStatePaths: TwoAccountStatePaths;
};
/**
 * Builds a Playwright `globalSetup` default export that mints TWO distinct
 * authenticated storageState files — one per account — by calling
 * `createAuthGlobalSetup` twice with the configured email/path pairs.
 *
 * Runs both setups in parallel via `Promise.all` (plan-eng-review perf
 * finding 2026-05-29). Each underlying `createAuthGlobalSetup` launches
 * its own Chromium instance; running both concurrently saves ~2-3s of
 * cold-cache wall-clock per suite invocation at the cost of ~300MB
 * additional peak memory during the brief boot overlap. Modern CI workers
 * (4GB+) and local dev machines handle the overlap without issue; the
 * memory is released as soon as both browsers close at the end of the
 * setup run. For 10+ accounts the trade-off would invert — at 2 accounts
 * parallel is the right call.
 *
 * Use when a spec must drive Account A and Account B in the same run —
 * cross-account ownership (US-15), permission boundaries, multi-tenant
 * isolation. For single-account specs, use `createAuthGlobalSetup` directly.
 *
 * @example
 * import {
 *   createTwoAccountGlobalSetup,
 *   resolveAuthStatePath,
 * } from '@arki/auth/testing/playwright';
 *
 * export default createTwoAccountGlobalSetup({
 *   baseUrl: 'http://localhost:5197',
 *   emails: { a: 'a@example.test', b: 'b@example.test' },
 *   authStatePaths: {
 *     a: resolveAuthStatePath(import.meta.url, '.auth', 'account-a.json'),
 *     b: resolveAuthStatePath(import.meta.url, '.auth', 'account-b.json'),
 *   },
 * });
 */
export declare function createTwoAccountGlobalSetup({ baseUrl, createSessionPath, emails, authStatePaths, }: CreateTwoAccountGlobalSetupOptions): () => Promise<void>;
/**
 * Fixtures contributed by `createTwoAccountTest`.
 *
 * Each `pageA` / `pageB` is a fresh `BrowserContext.newPage()` loaded with
 * the respective account's storageState. Both contexts share the worker's
 * single browser instance — Playwright handles the context isolation.
 */
export type TwoAccountFixtures = {
    pageA: Page;
    pageB: Page;
};
export type CreateTwoAccountTestOptions = {
    authStatePaths: TwoAccountStatePaths;
};
/**
 * Returns a Playwright `test` / `expect` pair with `pageA` + `pageB`
 * fixtures — each pre-loaded from the storageState file for the
 * corresponding account. Both fixtures dispose their browser context on
 * teardown.
 *
 * Spec code reads naturally:
 *
 * ```typescript
 * test('B cannot see A's universe', async ({ pageA, pageB }) => {
 *   const created = await createUniverseAs(pageA, 'A-only');
 *   const list = await listUniversesAs(pageB);
 *   expect(list.items.find((u) => u.id === created.id)).toBeUndefined();
 * });
 * ```
 */
export declare function createTwoAccountTest({ authStatePaths }: CreateTwoAccountTestOptions): {
    test: import("@playwright/test").TestType<import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions & TwoAccountFixtures, import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions>;
    expect: import("@playwright/test").Expect<{}>;
};
//# sourceMappingURL=playwright.d.ts.map