import { Format } from './Format';
import { parseJsonConfiguration } from './parseJsonConfiguration';
import { Parser } from './Parser';

const parsers: Record<Format, Parser> = {
    '.json': parseJsonConfiguration,
};

export const parseConfiguration = (file: string, format: Format) => {
    if (format in parsers) {
        return parsers[format](file);
    }

    throw new Error('Unknown format');
};
