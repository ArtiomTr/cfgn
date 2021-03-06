import { resolve } from 'path';
import { evaluateCjsModule } from '../src/evaluateCjsModule';

describe('evaluateCjsModule', () => {
    it('should evaluate commonjs module', () => {
        expect(
            evaluateCjsModule(
                `
const { resolve } = require('path');

module.exports = {
    value: 'hello',
    someValue: resolve(__dirname, 'entry.ts'),
    checkGlobal: process.cwd(),
};
`,
                __filename,
            ),
        ).toMatchObject({
            value: 'hello',
            someValue: resolve(__dirname, 'entry.ts'),
            checkGlobal: process.cwd(),
        });
    });
});
