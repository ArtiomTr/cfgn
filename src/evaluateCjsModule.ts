import { createRequire } from 'module';
import { dirname } from 'path';
import { createContext, Script } from 'vm';

export const evaluateCjsModule = (code: string, filepath: string) => {
    const entry = new Script(code);

    const exports = {};

    const context = createContext({
        ...global,
        module: { exports },
        exports,
        require: createRequire(filepath),
        __filename: filepath,
        __dirname: dirname(filepath),
    });

    entry.runInContext(context, {
        breakOnSigint: true,
    });

    return context.module.exports;
};
