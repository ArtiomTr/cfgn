import { access } from 'fs-extra';
import { mocked } from 'ts-jest/utils';

import { getFirstExistingFile, NoFilesFoundError } from '../src/getFirstExistingFile';

const mockedAccess = mocked(access);

beforeEach(() => {
    mockedAccess.mockClear();
});

describe('getFirstExistingFile', () => {
    it('should return first file which is accessible', async () => {
        (access as jest.Mock<any, any>).mockImplementation(async (path) => {
            if (path !== 'hello') {
                throw new Error('err');
            }
        });

        expect(jest.isMockFunction(access)).toBeTruthy();

        expect(await getFirstExistingFile(['a', 'b.ts', 'c', 'hello', 'd', 'e'])).toStrictEqual(['hello', 3]);
    });

    it('should not call access function if accessible file already found', async () => {
        mockedAccess.mockImplementation(async (path) => {
            if (path !== 'hello') {
                throw new Error('err');
            }
        });

        expect(await getFirstExistingFile(['d', 'hello', 'e', 'f'])).toStrictEqual(['hello', 1]);

        expect(mockedAccess).toBeCalledTimes(2);
    });

    it('should throw error, if file not found', async () => {
        mockedAccess.mockImplementation(async (path) => {
            throw new Error('err');
        });

        await expect(getFirstExistingFile(['d', 'hello', 'e', 'f'])).rejects.toBeInstanceOf(NoFilesFoundError);

        expect(mockedAccess).toBeCalledTimes(4);
    });
});
