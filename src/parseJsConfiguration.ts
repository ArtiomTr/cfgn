import { getDefaultExport } from './getDefaultExport';

export const parseJsConfiguration = async (file: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const requiredConfiguration = require(file);

    return getDefaultExport(requiredConfiguration);
};
