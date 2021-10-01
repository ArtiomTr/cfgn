import { getDefaultExport } from './getDefaultExport';
import { transpileAndParseConfiguration } from './transpileAndParseConfiguration';

export const parseTsConfiguration = async (filepath: string) => {
    return getDefaultExport(await transpileAndParseConfiguration(filepath));
};
