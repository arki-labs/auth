import type { Column } from 'drizzle-orm';
import type { AnyColumnSpec, ColumnKit, Dialect } from '@arki/db/columns';
import type { AuthColumnFill, AuthColumnOptions, PrimaryColumnSource, SpecValue } from './column-options.js';
export type { AuthColumnFill, AuthColumnNaming, AuthColumnOptions, PrimaryColumnSource } from './column-options.js';
/**
 * Drizzle tables and column sets for the four Better Auth core tables, written
 * once against the column kit (`@arki/db/columns`): `pgColumns(schema)` builds
 * them on Postgres, `sqliteColumns({ prefix })` on SQLite.
 *
 * `createAuthTables(c, options)` builds all four tables in one call. The app
 * passes its kit, its id columns, who fills the defaulted columns (`fill`), how
 * columns are spelled (`naming`) and its extra or replaced columns (`columns`).
 * The lib never makes ids.
 *
 * Each `auth*Columns(c, options)` returns a plain record of fresh column specs
 * for apps that must build a table themselves (`c.table(name, columns)`). A key
 * written after the spread replaces that column.
 */
/**
 * The app's own columns for one table: any key but `id`, which comes from
 * `ids`. Written as a check on the type's own keys, not as `Record<string, …>`:
 * an index signature would make `keyof` of the extras `string` inside the
 * factory, and the standard `id` column would no longer be findable there.
 */
export type ExtraColumns<D extends Dialect, TColumns> = {
    [K in keyof TColumns]: K extends 'id' ? never : AnyColumnSpec<D>;
};
/** No extra columns: what a table gets when `columns` leaves it out. */
type NoColumns = Record<never, never>;
export type AuthUserOptions<TId, TFill extends AuthColumnFill> = AuthColumnOptions<TFill> & {
    /** The primary key column, e.g. `c.id(userId).primaryColumn()`. */
    id: TId;
};
export type AuthSessionOptions<TId, TUserId, TFill extends AuthColumnFill> = AuthColumnOptions<TFill> & {
    /** The primary key column. */
    id: TId;
    /** The column that points at the user, already finished with its `.references(...)`. */
    userId: TUserId;
};
export type AuthAccountOptions<TId, TUserId, TFill extends AuthColumnFill> = AuthSessionOptions<TId, TUserId, TFill>;
export type AuthVerificationOptions<TId, TFill extends AuthColumnFill> = AuthColumnOptions<TFill> & {
    /** The primary key column. */
    id: TId;
};
/** Columns of the Better Auth `user` model. */
export declare function authUserColumns<D extends Dialect, TId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { id, naming, fill }: AuthUserOptions<TId, TFill>): {
    id: TId;
    name: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    email: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    emailVerified: {
        app: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
            defaultFn: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    image: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    createdAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
            defaultFn: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    updatedAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
            defaultFn: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
};
/** Columns of the Better Auth `session` model. */
export declare function authSessionColumns<D extends Dialect, TId extends AnyColumnSpec<D>, TUserId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { id, userId, naming, fill }: AuthSessionOptions<TId, TUserId, TFill>): {
    id: TId;
    expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    token: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    createdAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    updatedAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    ipAddress: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    userAgent: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    userId: TUserId;
};
/** Columns of the Better Auth `account` model. */
export declare function authAccountColumns<D extends Dialect, TId extends AnyColumnSpec<D>, TUserId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { id, userId, naming, fill }: AuthAccountOptions<TId, TUserId, TFill>): {
    id: TId;
    accountId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    providerId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    userId: TUserId;
    accessToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    refreshToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    idToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    accessTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
    refreshTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
    scope: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    password: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
    createdAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    updatedAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
};
/** Columns of the Better Auth `verification` model. */
export declare function authVerificationColumns<D extends Dialect, TId extends AnyColumnSpec<D>, TFill extends AuthColumnFill>(c: ColumnKit<D>, { id, naming, fill }: AuthVerificationOptions<TId, TFill>): {
    id: TId;
    identifier: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    value: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
        notNull: true;
    }>;
    createdAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            default: true;
            defaultFn: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
    updatedAt: {
        app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            default: true;
            defaultFn: true;
        }>;
        database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            default: true;
        }>;
    }[TFill];
};
/**
 * The user id source also makes foreign keys that point at the user table.
 * `createForeignKeyFactory` is a method, so a dialect's own factory (taking
 * `() => PgColumn` or `() => SQLiteColumn`) fits where the user table's `id` is
 * typed as a plain `Column`; a factory of the other dialect still does not.
 */
export type UserIdSource<TSpec, TForeignKeys> = PrimaryColumnSource<TSpec> & {
    createForeignKeyFactory(reference: () => Column): TForeignKeys;
};
export type CreateAuthTablesOptions<D extends Dialect, TUserId extends AnyColumnSpec<D>, TSessionId extends AnyColumnSpec<D>, TAccountId extends AnyColumnSpec<D>, TVerificationId extends AnyColumnSpec<D>, TForeignKeys, TFill extends AuthColumnFill, TUserColumns extends ExtraColumns<D, TUserColumns>, TSessionColumns extends ExtraColumns<D, TSessionColumns>, TAccountColumns extends ExtraColumns<D, TAccountColumns>, TVerificationColumns extends ExtraColumns<D, TVerificationColumns>> = AuthColumnOptions<TFill> & {
    /** The app's id sources, e.g. `authIdSources` from `@arki/auth/pg`. The lib never makes ids. */
    ids: {
        user: UserIdSource<TUserId, TForeignKeys>;
        session: PrimaryColumnSource<TSessionId>;
        account: PrimaryColumnSource<TAccountId>;
        verification: PrimaryColumnSource<TVerificationId>;
    };
    /**
     * The app's own columns per table, merged after the standard ones: a new key
     * adds a column, a standard key replaces that column. The row types include
     * them.
     */
    columns?: {
        user?: TUserColumns;
        session?: TSessionColumns;
        account?: TAccountColumns;
        verification?: TVerificationColumns;
    };
};
/**
 * The four Better Auth tables. Returns them plus `userForeignKeys`, the factory
 * other features use to point at the user table.
 *
 * @example
 * ```typescript
 * const c = pgColumns(schema);
 * export const { User, Session, Account, Verification, userForeignKeys } = createAuthTables(c, {
 *   fill: 'app',
 *   ids: authIdSources,
 *   columns: {
 *     user: { tweaks: tweaksSpec(c).notNull().default(EMPTY_TWEAKS) },
 *   },
 * });
 * ```
 */
export declare function createAuthTables<D extends Dialect, TUserId extends AnyColumnSpec<D>, TSessionId extends AnyColumnSpec<D>, TAccountId extends AnyColumnSpec<D>, TVerificationId extends AnyColumnSpec<D>, TForeignKeys, TFill extends AuthColumnFill, TUserColumns extends ExtraColumns<D, TUserColumns> = NoColumns, TSessionColumns extends ExtraColumns<D, TSessionColumns> = NoColumns, TAccountColumns extends ExtraColumns<D, TAccountColumns> = NoColumns, TVerificationColumns extends ExtraColumns<D, TVerificationColumns> = NoColumns>(c: ColumnKit<D>, { ids, naming, fill, columns, }: CreateAuthTablesOptions<D, TUserId, TSessionId, TAccountId, TVerificationId, TForeignKeys, TFill, TUserColumns, TSessionColumns, TAccountColumns, TVerificationColumns>): {
    User: import("@arki/db/columns").TableOf<D, "users", Pick<{
        id: TUserId;
        name: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        email: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        emailVerified: {
            app: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        image: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, "id"> & Omit<{
        id: TUserId;
        name: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        email: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        emailVerified: {
            app: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "boolean", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        image: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, keyof (TUserColumns & {})> & TUserColumns>;
    Session: import("@arki/db/columns").TableOf<D, "sessions", Pick<{
        id: TSessionId;
        expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        token: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        ipAddress: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        userAgent: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: SpecValue<TUserId>;
        }>;
    }, "id"> & Omit<{
        id: TSessionId;
        expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        token: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        ipAddress: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        userAgent: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: SpecValue<TUserId>;
        }>;
    }, keyof (TSessionColumns & {})> & TSessionColumns>;
    Account: import("@arki/db/columns").TableOf<D, "accounts", Pick<{
        id: TAccountId;
        accountId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        providerId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: SpecValue<TUserId>;
        }>;
        accessToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        refreshToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        idToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        accessTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
        refreshTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
        scope: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        password: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, "id"> & Omit<{
        id: TAccountId;
        accountId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        providerId: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        userId: import("@arki/db/columns").ColumnSpec<D, "text", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: SpecValue<TUserId>;
        }>;
        accessToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        refreshToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        idToken: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        accessTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
        refreshTokenExpiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags>;
        scope: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        password: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, keyof (TAccountColumns & {})> & TAccountColumns>;
    Verification: import("@arki/db/columns").TableOf<D, "verifications", Pick<{
        id: TVerificationId;
        identifier: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        value: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, "id"> & Omit<{
        id: TVerificationId;
        identifier: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        value: import("@arki/db/columns").ColumnSpec<D, "text", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        expiresAt: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
            notNull: true;
        }>;
        createdAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
        updatedAt: {
            app: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                default: true;
                defaultFn: true;
            }>;
            database: import("@arki/db/columns").ColumnSpec<D, "timestamp", import("@arki/db/columns").NoFlags & {
                notNull: true;
            } & {
                default: true;
            }>;
        }[TFill];
    }, keyof (TVerificationColumns & {})> & TVerificationColumns>;
    userForeignKeys: TForeignKeys;
};
//# sourceMappingURL=auth-tables.d.ts.map