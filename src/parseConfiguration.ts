import { Format } from './Format';
import { parseJsonConfiguration } from './parseJsonConfiguration';
import { Parser } from './Parser';
import { parseJsConfiguration } from '.';

const parsers: Record<Format, Parser> = {
    [Format.JSON]: parseJsonConfiguration,
    [Format.JS]: parseJsConfiguration,
    [Format.COMMONJS]: parseJsConfiguration,
};

export const parseConfiguration = (file: string, format: Format) => {
    if (format in parsers) {
        return parsers[format](file);
    }

    throw new Error('Unknown format');
};