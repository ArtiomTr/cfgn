import { getDefaultExport } from './getDefaultExport';
import { transpileAndParseConfiguration } from './transpileAndParseConfiguration';

export const parseEsmConfiguration = async (file: string) => {
    // TODO: add possibility to resolve native esm modules
    return getDefaultExport(await transpileAndParseConfiguration(file));
};
