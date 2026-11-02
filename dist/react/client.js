import { magicLinkClient, organizationClient } from 'better-auth/client/plugins';
import { createAuthClient as createEngineClient } from 'better-auth/react';
import { resolveDefinition } from '../definition.js';
import { authCapabilities } from './capabilities.js';
const METHOD_CLIENT_PLUGINS = {
    password: () => [],
    magicLink: () => [magicLinkClient()],
    google: () => [],
    apple: () => [],
    facebook: () => [],
    microsoft: () => [],
    github: () => [],
};
const pluginsOfMethod = (method) => METHOD_CLIENT_PLUGINS[method]();
/** The engine client plugins a definition's methods need, typed per method. */
export function definitionClientPlugins(definition) {
    return definition.methods.flatMap(method => pluginsOfMethod(method));
}
const workspaceFactories = {
    true: () => organizationClient({ teams: { enabled: true } }),
    false: () => organizationClient({ teams: { enabled: false } }),
};
/**
 * The same factories, typed as a mapped type: indexing it with a generic key returns
 * `WorkspacePlugins[K]`, so the compiler checks the helper's return type against its body
 * (the "correlated union" pattern, TypeScript PR #47109).
 */
const WORKSPACES_CLIENT_PLUGINS = workspaceFactories;
/** Reads `value[key]` and keeps the indexed type `T[K]`; destructuring would widen it. */
function readProperty(value, key) {
    return value[key];
}
/** The organization client plugin when `workspaces` is on, typed from the value as written. */
export function workspacesClientPlugins(definition) {
    const workspaces = readProperty(definition, 'workspaces');
    if (workspaces === undefined)
        return [];
    const teams = readProperty(workspaces, 'teams');
    const key = `${teams}`;
    return [WORKSPACES_CLIENT_PLUGINS[key]()];
}
/**
 * Builds the auth client for a definition. A definition with `workspaces` gets the organization
 * API (`organizationClient()`), typed with or without teams as the definition says.
 */
export function createAuthClient(definition, options = {}) {
    resolveDefinition(definition);
    const extra = options.plugins ?? [];
    const plugins = [
        ...definitionClientPlugins(definition),
        ...workspacesClientPlugins(definition),
        ...extra,
    ];
    const engineClient = createEngineClient({
        ...(options.baseURL !== undefined && { baseURL: options.baseURL }),
        ...(options.fetch !== undefined && { fetchOptions: { customFetchImpl: options.fetch } }),
        plugins,
    });
    return withCapabilities(engineClient, authCapabilities(definition));
}
/**
 * Adds `capabilities` to the engine client. The engine client is a Proxy that answers every key it
 * does not know with a route proxy, so a property set on it cannot be read back; the outer Proxy
 * answers `capabilities` itself and hands every other key to the engine client.
 */
function withCapabilities(client, capabilities) {
    return new Proxy(Object.assign(client, { capabilities }), {
        get: (target, property, receiver) => property === 'capabilities' ? capabilities : Reflect.get(target, property, receiver),
    });
}
//# sourceMappingURL=client.js.map