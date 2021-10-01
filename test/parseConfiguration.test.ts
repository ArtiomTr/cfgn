import { parseEsmConfiguration } from '../src/parseEsmConfiguration';
import { parseJsConfiguration } from '../src/parseJsConfiguration';
import { parseJsonConfiguration } from '../src/parseJsonConfiguration';
import { parseTsConfiguration } from '../src/parseTsConfiguration';

import { parseConfiguration } from '../src/parseConfiguration';
import { Format } from '../src/Format';
import { mockParsers } from './mockParsers';

jest.mock('../src/parseEsmConfiguration');
jest.mock('../src/parseJsConfiguration');
jest.mock('../src/parseJsonConfiguration');
jest.mock('../src/parseTsConfiguration');

mockParsers();

describe('parseConfiguration', () => {
    it('should parse configuration (given esm format)', async () => {
        await parseConfiguration('hello.ts', Format.ESMODULE);
        expect(parseEsmConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (given js format)', async () => {
        await parseConfiguration('hello.config.c', Format.JS);
        expect(parseJsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (given cjs format)', async () => {
        await parseConfiguration('hello.config.c', Format.COMMONJS);
        expect(parseJsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (given json format)', async () => {
        await parseConfiguration('hello.js', Format.JSON);
        expect(parseJsonConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (given ts format)', async () => {
        await parseConfiguration('hello.jsx', Format.TS);
        expect(parseTsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (file format esm)', async () => {
        await parseConfiguration('hello.mjs');
        expect(parseEsmConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (file format js)', async () => {
        await parseConfiguration('hello.js');
        expect(parseJsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (file format cjs)', async () => {
        await parseConfiguration('hello.cjs');
        expect(parseJsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (file format json)', async () => {
        await parseConfiguration('hello.json');
        expect(parseJsonConfiguration).toBeCalledOnlyThisParser();
    });

    it('should parse configuration (file format ts)', async () => {
        await parseConfiguration('hello.ts');
        expect(parseTsConfiguration).toBeCalledOnlyThisParser();
    });

    it('should fail on unknown format', async () => {
        await expect(parseConfiguration('hello.asdf')).rejects.toBeDefined();
    });
});
