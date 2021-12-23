import { readFile } from 'fs-extra';

import { evaluateCjsModule } from './evaluateCjsModule';

export const parseJsConfiguration = async (file: string) => {
    const content = await readFile(file);

    return evaluateCjsModule(content.toString(), file);
};
