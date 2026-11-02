/** Application-owned reporters cannot change authentication or observer completion. */
export declare function observeSafely<Report>(report: () => Report): Report | undefined;
/** Reserve execution once, even when an application context manager calls back twice. */
export declare function observeAuth<T>(name: string, run: () => T | Promise<T>): Promise<T>;
//# sourceMappingURL=telemetry.d.ts.map