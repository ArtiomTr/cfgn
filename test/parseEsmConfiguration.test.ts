import { parseEsmConfiguration } from '../src/parseEsmConfiguration';
import { dirname, resolve } from 'path';

describe('parseEsmConfiguration', () => {
    it('should parse esm configuration', async () => {
        expect(await parseEsmConfiguration(resolve(__dirname, 'exampleConfig.mjs'))).toMatchObject({
            hello: 'world',
            somepath: resolve(dirname(__filename), 'something'),
        });
    });
});
