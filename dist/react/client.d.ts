/**
 * The browser auth client, built from the same definition as the server. It adds the engine's
 * client plugins the definition needs and nothing else, and carries `capabilities` for the UI.
 *
 * @example
 * export const authClient = createAuthClient(authDefinition, { baseURL: resolveAuthClientBaseUrl(env.VITE_URL) });
 * authClient.capabilities.social; // ['google'] when the definition enables Google
 */
import type { BetterAuthClientPlugin } from 'better-auth/client';
import type { ReactAuthClient } from 'better-auth/react';
import { magicLinkClient } from 'better-auth/client/plugins';
import type { AuthDefinition, WorkspacesOption } from '../definition.js';
import type { AuthCapabilities } from './capabilities.js';
type MagicLinkClientPlugin = ReturnType<typeof magicLinkClient>;
/** The client plugins each method needs. Typed per method, so the client's API follows `methods`. */
type MethodClientPlugins = {
    readonly password: readonly [];
    readonly magicLink: readonly [MagicLinkClientPlugin];
    readonly google: readonly [];
    readonly apple: readonly [];
    readonly facebook: readonly [];
    readonly microsoft: readonly [];
    readonly github: readonly [];
};
/** The client plugins a definition's methods need. */
export type DefinitionClientPlugins<D extends AuthDefinition> = MethodClientPlugins[D['methods'][number]][number][];
/** The engine client plugins a definition's methods need, typed per method. */
export declare function definitionClientPlugins<D extends AuthDefinition>(definition: D): DefinitionClientPlugins<D>;
declare const workspaceFactories: {
    true: () => {
        id: "organization";
        version: string;
        $InferServerPlugin: import("better-auth/client").OrganizationPlugin<{
            ac: import("better-auth/client").AccessControl<{
                readonly organization: readonly ["update", "delete"];
                readonly member: readonly ["create", "update", "delete"];
                readonly invitation: readonly ["create", "cancel"];
                readonly team: readonly ["create", "update", "delete"];
                readonly ac: readonly ["create", "read", "update", "delete"];
            }>;
            roles: {
                admin: import("better-auth/client").Role;
                member: import("better-auth/client").Role;
                owner: import("better-auth/client").Role;
            };
            teams: {
                enabled: true;
            };
            schema: unknown;
            dynamicAccessControl: {
                enabled: false;
            };
        }>;
        getActions: ($fetch: import("@better-fetch/fetch").BetterFetch, _$store: import("better-auth/client").ClientStore, co: import("better-auth/client").BetterAuthClientOptions | undefined) => {
            $Infer: {
                ActiveOrganization: {
                    members: {
                        id: string;
                        organizationId: string;
                        role: "admin" | "member" | "owner";
                        createdAt: Date;
                        userId: string;
                        teamId?: string | undefined;
                        user: {
                            id: string;
                            email: string;
                            name: string;
                            image?: string | undefined;
                        };
                    }[];
                    invitations: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "admin" | "member" | "owner";
                        status: import("better-auth/client").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                        createdAt: Date;
                        teamId?: string | undefined;
                    }[];
                    teams: {
                        id: string;
                        name: string;
                        organizationId: string;
                        createdAt: Date;
                        updatedAt?: Date | undefined;
                    }[];
                } & {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                };
                Organization: {
                    id: string;
                    name: string;
                    slug: string;
                    logo?: string | null | undefined;
                    metadata?: any;
                    createdAt: Date;
                };
                Invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "admin" | "member" | "owner";
                    status: import("better-auth/client").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    createdAt: Date;
                    teamId?: string | undefined;
                };
                Member: {
                    id: string;
                    organizationId: string;
                    role: "admin" | "member" | "owner";
                    createdAt: Date;
                    userId: string;
                    teamId?: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image?: string | undefined;
                    };
                };
                Team: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                };
            };
            organization: {
                checkRolePermission: <R extends ({
                    teams: {
                        enabled: true;
                    };
                } extends {
                    roles: any;
                } ? string | number | symbol : "admin" | "member" | "owner")>(data: {
                    permissions: {
                        readonly organization?: ("delete" | "update")[] | undefined;
                        readonly member?: ("create" | "delete" | "update")[] | undefined;
                        readonly invitation?: ("cancel" | "create")[] | undefined;
                        readonly team?: ("create" | "delete" | "update")[] | undefined;
                        readonly ac?: ("create" | "delete" | "read" | "update")[] | undefined;
                    };
                } & {
                    role: R;
                }) => boolean;
            };
        };
        getAtoms: ($fetch: import("@better-fetch/fetch").BetterFetch) => {
            $listOrg: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeOrgSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeMemberSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeMemberRoleSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            activeOrganization: import("better-auth/client").AuthQueryAtom<import("better-auth/client").Prettify<{
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & {
                members: {
                    id: string;
                    organizationId: string;
                    role: "admin" | "member" | "owner";
                    createdAt: Date;
                    userId: string;
                    teamId?: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image?: string | undefined;
                    };
                }[];
                invitations: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "admin" | "member" | "owner";
                    status: import("better-auth/client").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    createdAt: Date;
                    teamId?: string | undefined;
                }[];
            }>>;
            listOrganizations: import("better-auth/client").AuthQueryAtom<{
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            }[]>;
            activeMember: import("better-auth/client").AuthQueryAtom<{
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            activeMemberRole: import("better-auth/client").AuthQueryAtom<{
                role: string;
            }>;
        };
        pathMethods: {
            "/organization/get-full-organization": "GET";
            "/organization/list-user-teams": "GET";
        };
        atomListeners: ({
            matcher(path: string): path is "/organization/create" | "/organization/update" | "/organization/delete";
            signal: "$listOrg";
        } | {
            matcher(path: string): boolean;
            signal: "$activeOrgSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$sessionSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$activeMemberSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$activeMemberRoleSignal";
        })[];
        $ERROR_CODES: {
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION">;
            YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: import("better-auth").RawError<"YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS">;
            ORGANIZATION_ALREADY_EXISTS: import("better-auth").RawError<"ORGANIZATION_ALREADY_EXISTS">;
            ORGANIZATION_SLUG_ALREADY_TAKEN: import("better-auth").RawError<"ORGANIZATION_SLUG_ALREADY_TAKEN">;
            ORGANIZATION_NOT_FOUND: import("better-auth").RawError<"ORGANIZATION_NOT_FOUND">;
            USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: import("better-auth").RawError<"USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION">;
            NO_ACTIVE_ORGANIZATION: import("better-auth").RawError<"NO_ACTIVE_ORGANIZATION">;
            USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: import("better-auth").RawError<"USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION">;
            MEMBER_NOT_FOUND: import("better-auth").RawError<"MEMBER_NOT_FOUND">;
            ROLE_NOT_FOUND: import("better-auth").RawError<"ROLE_NOT_FOUND">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM">;
            TEAM_ALREADY_EXISTS: import("better-auth").RawError<"TEAM_ALREADY_EXISTS">;
            TEAM_NOT_FOUND: import("better-auth").RawError<"TEAM_NOT_FOUND">;
            YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: import("better-auth").RawError<"YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER">;
            YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: import("better-auth").RawError<"YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION">;
            USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: import("better-auth").RawError<"USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION">;
            INVITATION_NOT_FOUND: import("better-auth").RawError<"INVITATION_NOT_FOUND">;
            YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: import("better-auth").RawError<"YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION">;
            EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: import("better-auth").RawError<"EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION">;
            EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION: import("better-auth").RawError<"EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION">;
            YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION">;
            INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: import("better-auth").RawError<"INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE">;
            FAILED_TO_RETRIEVE_INVITATION: import("better-auth").RawError<"FAILED_TO_RETRIEVE_INVITATION">;
            YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: import("better-auth").RawError<"YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS">;
            UNABLE_TO_REMOVE_LAST_TEAM: import("better-auth").RawError<"UNABLE_TO_REMOVE_LAST_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER">;
            ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: import("better-auth").RawError<"ORGANIZATION_MEMBERSHIP_LIMIT_REACHED">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM">;
            INVITATION_LIMIT_REACHED: import("better-auth").RawError<"INVITATION_LIMIT_REACHED">;
            TEAM_MEMBER_LIMIT_REACHED: import("better-auth").RawError<"TEAM_MEMBER_LIMIT_REACHED">;
            USER_IS_NOT_A_MEMBER_OF_THE_TEAM: import("better-auth").RawError<"USER_IS_NOT_A_MEMBER_OF_THE_TEAM">;
            YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: import("better-auth").RawError<"YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM">;
            YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: import("better-auth").RawError<"YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION">;
            YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION">;
            MISSING_AC_INSTANCE: import("better-auth").RawError<"MISSING_AC_INSTANCE">;
            YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: import("better-auth").RawError<"YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE">;
            TOO_MANY_ROLES: import("better-auth").RawError<"TOO_MANY_ROLES">;
            INVALID_RESOURCE: import("better-auth").RawError<"INVALID_RESOURCE">;
            ROLE_NAME_IS_ALREADY_TAKEN: import("better-auth").RawError<"ROLE_NAME_IS_ALREADY_TAKEN">;
            CANNOT_DELETE_A_PRE_DEFINED_ROLE: import("better-auth").RawError<"CANNOT_DELETE_A_PRE_DEFINED_ROLE">;
            ROLE_IS_ASSIGNED_TO_MEMBERS: import("better-auth").RawError<"ROLE_IS_ASSIGNED_TO_MEMBERS">;
            INVALID_TEAM_ID: import("better-auth").RawError<"INVALID_TEAM_ID">;
        };
    };
    false: () => {
        id: "organization";
        version: string;
        $InferServerPlugin: import("better-auth/client").OrganizationPlugin<{
            ac: import("better-auth/client").AccessControl<{
                readonly organization: readonly ["update", "delete"];
                readonly member: readonly ["create", "update", "delete"];
                readonly invitation: readonly ["create", "cancel"];
                readonly team: readonly ["create", "update", "delete"];
                readonly ac: readonly ["create", "read", "update", "delete"];
            }>;
            roles: {
                admin: import("better-auth/client").Role;
                member: import("better-auth/client").Role;
                owner: import("better-auth/client").Role;
            };
            teams: {
                enabled: false;
            };
            schema: unknown;
            dynamicAccessControl: {
                enabled: false;
            };
        }>;
        getActions: ($fetch: import("@better-fetch/fetch").BetterFetch, _$store: import("better-auth/client").ClientStore, co: import("better-auth/client").BetterAuthClientOptions | undefined) => {
            $Infer: {
                ActiveOrganization: {
                    members: {
                        id: string;
                        organizationId: string;
                        role: "admin" | "member" | "owner";
                        createdAt: Date;
                        userId: string;
                        user: {
                            id: string;
                            email: string;
                            name: string;
                            image?: string | undefined;
                        };
                    }[];
                    invitations: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "admin" | "member" | "owner";
                        status: import("better-auth/client").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                        createdAt: Date;
                    }[];
                } & {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                };
                Organization: {
                    id: string;
                    name: string;
                    slug: string;
                    logo?: string | null | undefined;
                    metadata?: any;
                    createdAt: Date;
                };
                Invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "admin" | "member" | "owner";
                    status: import("better-auth/client").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    createdAt: Date;
                };
                Member: {
                    id: string;
                    organizationId: string;
                    role: "admin" | "member" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image?: string | undefined;
                    };
                };
                Team: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                };
            };
            organization: {
                checkRolePermission: <R extends ({
                    teams: {
                        enabled: false;
                    };
                } extends {
                    roles: any;
                } ? string | number | symbol : "admin" | "member" | "owner")>(data: {
                    permissions: {
                        readonly organization?: ("delete" | "update")[] | undefined;
                        readonly member?: ("create" | "delete" | "update")[] | undefined;
                        readonly invitation?: ("cancel" | "create")[] | undefined;
                        readonly team?: ("create" | "delete" | "update")[] | undefined;
                        readonly ac?: ("create" | "delete" | "read" | "update")[] | undefined;
                    };
                } & {
                    role: R;
                }) => boolean;
            };
        };
        getAtoms: ($fetch: import("@better-fetch/fetch").BetterFetch) => {
            $listOrg: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeOrgSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeMemberSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            $activeMemberRoleSignal: import("better-auth/client").PreinitializedWritableAtom<boolean> & object;
            activeOrganization: import("better-auth/client").AuthQueryAtom<import("better-auth/client").Prettify<{
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & {
                members: {
                    id: string;
                    organizationId: string;
                    role: "admin" | "member" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image?: string | undefined;
                    };
                }[];
                invitations: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "admin" | "member" | "owner";
                    status: import("better-auth/client").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    createdAt: Date;
                }[];
            }>>;
            listOrganizations: import("better-auth/client").AuthQueryAtom<{
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            }[]>;
            activeMember: import("better-auth/client").AuthQueryAtom<{
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            activeMemberRole: import("better-auth/client").AuthQueryAtom<{
                role: string;
            }>;
        };
        pathMethods: {
            "/organization/get-full-organization": "GET";
            "/organization/list-user-teams": "GET";
        };
        atomListeners: ({
            matcher(path: string): path is "/organization/create" | "/organization/update" | "/organization/delete";
            signal: "$listOrg";
        } | {
            matcher(path: string): boolean;
            signal: "$activeOrgSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$sessionSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$activeMemberSignal";
        } | {
            matcher(path: string): boolean;
            signal: "$activeMemberRoleSignal";
        })[];
        $ERROR_CODES: {
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION">;
            YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: import("better-auth").RawError<"YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS">;
            ORGANIZATION_ALREADY_EXISTS: import("better-auth").RawError<"ORGANIZATION_ALREADY_EXISTS">;
            ORGANIZATION_SLUG_ALREADY_TAKEN: import("better-auth").RawError<"ORGANIZATION_SLUG_ALREADY_TAKEN">;
            ORGANIZATION_NOT_FOUND: import("better-auth").RawError<"ORGANIZATION_NOT_FOUND">;
            USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: import("better-auth").RawError<"USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION">;
            NO_ACTIVE_ORGANIZATION: import("better-auth").RawError<"NO_ACTIVE_ORGANIZATION">;
            USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: import("better-auth").RawError<"USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION">;
            MEMBER_NOT_FOUND: import("better-auth").RawError<"MEMBER_NOT_FOUND">;
            ROLE_NOT_FOUND: import("better-auth").RawError<"ROLE_NOT_FOUND">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM">;
            TEAM_ALREADY_EXISTS: import("better-auth").RawError<"TEAM_ALREADY_EXISTS">;
            TEAM_NOT_FOUND: import("better-auth").RawError<"TEAM_NOT_FOUND">;
            YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: import("better-auth").RawError<"YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER">;
            YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: import("better-auth").RawError<"YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION">;
            USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: import("better-auth").RawError<"USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION">;
            INVITATION_NOT_FOUND: import("better-auth").RawError<"INVITATION_NOT_FOUND">;
            YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: import("better-auth").RawError<"YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION">;
            EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: import("better-auth").RawError<"EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION">;
            EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION: import("better-auth").RawError<"EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION">;
            YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION">;
            INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: import("better-auth").RawError<"INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE">;
            FAILED_TO_RETRIEVE_INVITATION: import("better-auth").RawError<"FAILED_TO_RETRIEVE_INVITATION">;
            YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: import("better-auth").RawError<"YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS">;
            UNABLE_TO_REMOVE_LAST_TEAM: import("better-auth").RawError<"UNABLE_TO_REMOVE_LAST_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER">;
            ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: import("better-auth").RawError<"ORGANIZATION_MEMBERSHIP_LIMIT_REACHED">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM">;
            INVITATION_LIMIT_REACHED: import("better-auth").RawError<"INVITATION_LIMIT_REACHED">;
            TEAM_MEMBER_LIMIT_REACHED: import("better-auth").RawError<"TEAM_MEMBER_LIMIT_REACHED">;
            USER_IS_NOT_A_MEMBER_OF_THE_TEAM: import("better-auth").RawError<"USER_IS_NOT_A_MEMBER_OF_THE_TEAM">;
            YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: import("better-auth").RawError<"YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM">;
            YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: import("better-auth").RawError<"YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER">;
            YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION">;
            YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: import("better-auth").RawError<"YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION">;
            MISSING_AC_INSTANCE: import("better-auth").RawError<"MISSING_AC_INSTANCE">;
            YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: import("better-auth").RawError<"YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE">;
            YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: import("better-auth").RawError<"YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE">;
            TOO_MANY_ROLES: import("better-auth").RawError<"TOO_MANY_ROLES">;
            INVALID_RESOURCE: import("better-auth").RawError<"INVALID_RESOURCE">;
            ROLE_NAME_IS_ALREADY_TAKEN: import("better-auth").RawError<"ROLE_NAME_IS_ALREADY_TAKEN">;
            CANNOT_DELETE_A_PRE_DEFINED_ROLE: import("better-auth").RawError<"CANNOT_DELETE_A_PRE_DEFINED_ROLE">;
            ROLE_IS_ASSIGNED_TO_MEMBERS: import("better-auth").RawError<"ROLE_IS_ASSIGNED_TO_MEMBERS">;
            INVALID_TEAM_ID: import("better-auth").RawError<"INVALID_TEAM_ID">;
        };
    };
};
/** The organization plugin per `teams` value. */
type WorkspacePlugins = {
    [K in keyof typeof workspaceFactories]: ReturnType<(typeof workspaceFactories)[K]>;
};
/**
 * The client plugins a definition's `workspaces` value needs: the organization API (typed with or
 * without teams), or none. An indexed access, not a conditional type, so it stays generic until
 * the definition is known (a conditional type would be resolved early to "maybe teams").
 */
export type WorkspacesClientPlugins<W extends WorkspacesOption | undefined> = WorkspacePlugins[`${NonNullable<W>['teams']}`][];
/** The organization client plugin when `workspaces` is on, typed from the value as written. */
export declare function workspacesClientPlugins<D extends AuthDefinition>(definition: D): WorkspacesClientPlugins<D['workspaces']>;
export type AuthClientOptions<P extends readonly BetterAuthClientPlugin[]> = {
    /** Absolute URL of the app. In the browser use `resolveAuthClientBaseUrl` so SSR and client agree. */
    readonly baseURL?: string;
    /** Replaces the global `fetch` (tests, custom transports). */
    readonly fetch?: typeof fetch;
    /** Extra engine client plugins. The definition's own (magic link, organizations) are added already. */
    readonly plugins?: P;
};
/** Every engine client plugin of a client: the definition's own and the app's extra ones. */
type ClientPlugins<D extends AuthDefinition, P extends readonly BetterAuthClientPlugin[]> = (DefinitionClientPlugins<D>[number] | WorkspacesClientPlugins<D['workspaces']>[number] | P[number])[];
/**
 * The client `createAuthClient` returns for a definition: the engine's React client for exactly
 * the plugins the definition needs (plus the app's extra ones), and `capabilities` for the UI.
 * Named through the engine's own `ReactAuthClient`, so the published types refer to it instead of
 * spelling out every endpoint.
 */
export type AuthClient<D extends AuthDefinition, P extends readonly BetterAuthClientPlugin[] = readonly []> = ReactAuthClient<{
    plugins: ClientPlugins<D, P>;
}> & {
    readonly capabilities: AuthCapabilities<D>;
};
/**
 * Builds the auth client for a definition. A definition with `workspaces` gets the organization
 * API (`organizationClient()`), typed with or without teams as the definition says.
 */
export declare function createAuthClient<const D extends AuthDefinition, const P extends readonly BetterAuthClientPlugin[] = readonly []>(definition: D, options?: AuthClientOptions<P>): AuthClient<D, P>;
export {};
//# sourceMappingURL=client.d.ts.map