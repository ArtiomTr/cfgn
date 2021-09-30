import { parseEsmConfiguration } from '../src/parseEsmConfiguration';
import { dirname, resolve } from 'path';
import { build } from 'esbuild';

beforeEach(() => {
    (build as jest.Mock<any, any>).mockClear();
});

describe('parseEsmConfiguration', () => {
    it('should parse esm configuration', async () => {
        expect(await parseEsmConfiguration(resolve(__dirname, 'exampleConfig.mjs'))).toMatchObject({
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
