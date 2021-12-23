import { extname } from 'path';

import { Format } from './Format';
import { parseEsmConfiguration } from './parseEsmConfiguration';
import { parseJsConfiguration } from './parseJsConfiguration';
import { parseJsonConfiguration } from './parseJsonConfiguration';
import { Parser } from './Parser';
import { parseTsConfiguration } from './parseTsConfiguration';

const parsers: Record<Format, Parser> = {
    [Format.JSON]: parseJsonConfiguration,
    [Format.JS]: parseJsConfiguration,
    [Format.COMMONJS]: parseJsConfiguration,
    [Format.ESMODULE]: parseEsmConfiguration,
    [Format.TS]: parseTsConfiguration,
};

export const parseConfiguration = async (file: string, format: Format = extname(file) as Format) => {
    if (format in parsers) {
        return parsers[format](file);
    }

    throw new Error('Unknown format');
};
