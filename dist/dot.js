import { infra, service } from '@arki/dot/unit';
import { createAuth } from './pg/index.js';
/** The auth as a Dot service named `auth`. Needs `db` and `mail`. */
export function auth(definition, bindings) {
    return infra({
        name: 'auth',
        needs: { db: service(), mail: service() },
        configure(ctx) {
            ctx.registerService('auth', 'auth');
            ctx.declareProvides('auth');
        },
        provides: {
            auth: ({ db, mail }) => createAuth(definition, { ...bindings, db, mail }),
        },
    });
}
//# sourceMappingURL=dot.js.map