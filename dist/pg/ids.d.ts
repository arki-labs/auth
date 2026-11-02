export declare const userIdColumns: {
    primaryColumn: (name?: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetIsPrimaryKey<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>>, `usr_${string}`>>;
    optionalColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `usr_${string}` | null>>;
    requiredColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `usr_${string}`>>;
    reference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `usr_${string}`>;
    optionalReference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `usr_${string}`>;
    foreignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `usr_${string}`>;
    optionalForeignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `usr_${string}`>;
    createForeignKeyFactory: (referenceFn: () => import("@arki/db/pg").PgColumn) => {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `usr_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `usr_${string}`>;
    };
};
export declare const sessionIdColumns: {
    primaryColumn: (name?: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetIsPrimaryKey<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>>, `sess_${string}`>>;
    optionalColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `sess_${string}` | null>>;
    requiredColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `sess_${string}`>>;
    reference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `sess_${string}`>;
    optionalReference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `sess_${string}`>;
    foreignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `sess_${string}`>;
    optionalForeignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `sess_${string}`>;
    createForeignKeyFactory: (referenceFn: () => import("@arki/db/pg").PgColumn) => {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `sess_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `sess_${string}`>;
    };
};
export declare const accountIdColumns: {
    primaryColumn: (name?: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetIsPrimaryKey<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>>, `acc_${string}`>>;
    optionalColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `acc_${string}` | null>>;
    requiredColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `acc_${string}`>>;
    reference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `acc_${string}`>;
    optionalReference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `acc_${string}`>;
    foreignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `acc_${string}`>;
    optionalForeignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `acc_${string}`>;
    createForeignKeyFactory: (referenceFn: () => import("@arki/db/pg").PgColumn) => {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `acc_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `acc_${string}`>;
    };
};
export declare const verificationIdColumns: {
    primaryColumn: (name?: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetIsPrimaryKey<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>>, `verif_${string}`>>;
    optionalColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `verif_${string}` | null>>;
    requiredColumn: (name: string) => import("@arki/db/pg").SetHasRuntimeDefault<import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `verif_${string}`>>;
    reference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `verif_${string}`>;
    optionalReference: (name: string) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `verif_${string}`>;
    foreignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `verif_${string}`>;
    optionalForeignKey: (name: string, referenceFn: () => import("@arki/db/pg").PgColumn, options?: {
        onDelete?: import("@arki/db/id").OnDelete;
    }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `verif_${string}`>;
    createForeignKeyFactory: (referenceFn: () => import("@arki/db/pg").PgColumn) => {
        required: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `verif_${string}`>;
        optional: (name: string, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `verif_${string}`>;
    };
};
/**
 * The auth id kinds as `createAuthTables` takes them: `varchar(256)` primary keys, and foreign keys
 * to the user from `userForeignKeys` as plain Postgres columns for the app's own tables.
 */
export declare const authIdSources: {
    user: {
        primaryColumn: () => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            primaryKey: true;
        }, "type"> & {
            type: `usr_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        createForeignKeyFactory: (referenceFn: () => import("@arki/db/pg").PgColumn) => {
            required: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").SetNotNull<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>>, `usr_${string}`>;
            optional: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/pg").Set$Type<import("@arki/db/pg").PgVarcharBuilder<[string, ...string[]]>, `usr_${string}`>;
        };
    };
    session: {
        primaryColumn: (name?: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            primaryKey: true;
        }, "type"> & {
            type: `sess_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        optionalColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `sess_${string}` | null;
        } & {
            default: true;
            defaultFn: true;
        }>;
        requiredColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `sess_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        reference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `sess_${string}`;
        }>;
        optionalReference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `sess_${string}`;
        }>;
        foreignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `sess_${string}`;
        }>;
        optionalForeignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `sess_${string}`;
        }>;
        createForeignKeyFactory: (ref: () => import("drizzle-orm/column").Column) => {
            required: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
                notNull: true;
            }, "type"> & {
                type: `sess_${string}`;
            }>;
            optional: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
                type: `sess_${string}`;
            }>;
        };
    };
    account: {
        primaryColumn: (name?: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            primaryKey: true;
        }, "type"> & {
            type: `acc_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        optionalColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `acc_${string}` | null;
        } & {
            default: true;
            defaultFn: true;
        }>;
        requiredColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `acc_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        reference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `acc_${string}`;
        }>;
        optionalReference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `acc_${string}`;
        }>;
        foreignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `acc_${string}`;
        }>;
        optionalForeignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `acc_${string}`;
        }>;
        createForeignKeyFactory: (ref: () => import("drizzle-orm/column").Column) => {
            required: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
                notNull: true;
            }, "type"> & {
                type: `acc_${string}`;
            }>;
            optional: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
                type: `acc_${string}`;
            }>;
        };
    };
    verification: {
        primaryColumn: (name?: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        } & {
            primaryKey: true;
        }, "type"> & {
            type: `verif_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        optionalColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `verif_${string}` | null;
        } & {
            default: true;
            defaultFn: true;
        }>;
        requiredColumn: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `verif_${string}`;
        } & {
            default: true;
            defaultFn: true;
        }>;
        reference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `verif_${string}`;
        }>;
        optionalReference: (name: string) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `verif_${string}`;
        }>;
        foreignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
            notNull: true;
        }, "type"> & {
            type: `verif_${string}`;
        }>;
        optionalForeignKey: (name: string, ref: () => import("drizzle-orm/column").Column, options?: {
            onDelete?: import("@arki/db/id").OnDelete;
        }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
            type: `verif_${string}`;
        }>;
        createForeignKeyFactory: (ref: () => import("drizzle-orm/column").Column) => {
            required: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags & {
                notNull: true;
            }, "type"> & {
                type: `verif_${string}`;
            }>;
            optional: (name: string, options?: {
                onDelete?: import("@arki/db/id").OnDelete;
            }) => import("@arki/db/columns").ColumnSpec<"pg", "id", Omit<import("@arki/db/columns").NoFlags, "type"> & {
                type: `verif_${string}`;
            }>;
        };
    };
};
//# sourceMappingURL=ids.d.ts.map