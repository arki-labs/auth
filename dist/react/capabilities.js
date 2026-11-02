import { isSocialMethod } from '../definition.js';
/** Reads the capabilities of a definition. */
export function authCapabilities(definition) {
    const methods = definition.methods;
    return {
        methods,
        social: methods.filter((method) => isSocialMethod(method)),
        password: methods.includes('password'),
        magicLink: methods.includes('magicLink'),
        workspaces: definition.workspaces !== undefined,
    };
}
//# sourceMappingURL=capabilities.js.map