import { access } from 'fs-extra';
import { mocked } from 'ts-jest/utils';
import { Format } from '../src/Format';
import { parseConfiguration } from '../src/parseConfiguration';
import { parseConfigurations } from '../src/parseConfigurations';

const accessMock = mocked(access);
const parseConfigurationMock = mocked(parseConfiguration);

jest.mock('../src/parseConfiguration');

describe('parseConfigurations', () => {
    it('should find suitable configuration', async () => {
        accessMock.mockImplementation(async (path) => {
            if (path !== 'hello') {
                throw new Error('sample error');
            }
        });

        await parseConfigurations([
            {
                path: 'bye',
                format: Format.JSON,
            },
            {
                path: 'a',
                format: Format.COMMONJS,
            },
            {
                path: 'hello',
                format: Format.ESMODULE,
            },
            {
                path: 'ad',
                format: Format.JS,
            },
        ]);

        expect(parseConfigurationMock).toBeCalledWith('hello', Format.ESMODULE);
        expect(parseConfigurationMock).not.toBeCalledWith('bye', Format.JSON);
        expect(parseConfigurationMock).not.toBeCalledWith('a', Format.COMMONJS);
        expect(parseConfigurationMock).not.toBeCalledWith('ad', Format.JS);
    });
});
