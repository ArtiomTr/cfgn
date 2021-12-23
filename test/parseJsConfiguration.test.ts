import { parseJsConfiguration } from '../src/parseJsConfiguration';
import { resolve } from 'path';
import { readFile } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

describe('parseJsConfiguration', () => {
    it('should require js file', async () => {
        mocked(readFile).mockImplementationOnce(async () =>
            Buffer.from(`
const { resolve } = require('path');

module.exports = {
    someConfig: 'hello',
    t: resolve(__dirname, 'path.ts'),
};
`),
        );
        expect(await parseJsConfiguration(resolve(__dirname, 'exampleConfig.js'))).toEqual({
            someConfig: 'hello',
            t: resolve(__dirname, 'path.ts'),
        });
    });
});
