import { Format } from './Format';
import { getFirstExistingFile } from './getFirstExistingFile';
import { parseConfiguration } from './parseConfiguration';

export type PossibleConfiguration = {
    path: string;
    format?: Format;
};

export const parseConfigurations = async (possibleConfigurations: PossibleConfiguration[]) => {
    const [file, index] = await getFirstExistingFile(possibleConfigurations.map(({ path }) => path));

    const format = possibleConfigurations[index].format;

    return parseConfiguration(file, format);
};
