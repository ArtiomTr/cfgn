import { readFile } from 'fs-extra';
import { parseJsonConfiguration } from '../src/parseJsonConfiguration';

beforeEach(() => {
    (readFile as jest.Mock<any, any>).mockClear();
});

describe('parseJsonConfiguration', () => {
    it('should read file and parse json', async () => {
        const configuration = {
            hello: 'asdf',
        };

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            return JSON.stringify(configuration);
        });

        expect(await parseJsonConfiguration('hello')).toStrictEqual(configuration);
        expect(readFile).toBeCalledWith('hello');
    });
});
