import { tmpdir } from 'os';

import { build } from 'esbuild';

import { evaluateCjsModule } from './evaluateCjsModule';

export const transpileAndParseConfiguration = async (file: string) => {
    const buildResult = await build({
        entryPoints: [file],
        platform: 'node',
        format: 'cjs',
        outdir: tmpdir(),
        write: false,
        bundle: true,
    });

    if (buildResult.outputFiles.length === 0) {
        throw new Error(`Failed to transpile configuration file "${file}"`);
    }

    // TODO: Evaluate all files, not only first one
    return evaluateCjsModule(buildResult.outputFiles[0].text, file) as Record<string, unknown>;
};
