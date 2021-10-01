import { parseEsmConfiguration } from '../src/parseEsmConfiguration';
import { dirname, resolve } from 'path';
import { build } from 'esbuild';

beforeEach(() => {
    (build as jest.Mock<any, any>).mockClear();
});

describe('parseTsConfiguration', () => {
    it('should parse ts configuration', async () => {
        (build as jest.Mock<any, any>).mockImplementation(() => {
            return {
                outputFiles: [
                    {
                        text: `const path = require('path');
module.exports = {
    hello: 'world',
    somepath: path.resolve(path.dirname(__filename), 'something')   
}`,
                    },
                ],
            };
        });

        expect(await parseEsmConfiguration(resolve(__dirname, 'exampleConfig.ts'))).toMatchObject({
            hello: 'world',
            somepath: resolve(dirname(__filename), 'something'),
        });
    });
    it('should throw error if transpiling failed', async () => {
        (build as jest.Mock<any, any>).mockImplementation(() => {
            return {
                outputFiles: [],
            };
        });

        await expect(parseEsmConfiguration(resolve(__dirname, 'exampleConfig.mjs'))).rejects.toBeDefined();
    });
});
