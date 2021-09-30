import { parseJsConfiguration } from '../src/parseJsConfiguration';
import { resolve } from 'path';

describe('parseJsConfiguration', () => {
    it('should require js file', async () => {
        expect(await parseJsConfiguration(resolve(__dirname, 'exampleConfig.js'))).toStrictEqual({
            someConfig: 'hello',
            t: resolve(__dirname, 'path.ts'),
        });
    });
});
