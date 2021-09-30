import { getDefaultExport } from '../src/getDefaultExport';

describe('getDefaultExport', () => {
    it('should return whole object, if it is commonjs', () => {
        expect(getDefaultExport({ something: 'hello' })).toStrictEqual({ something: 'hello' });
    });

    it('should return default export, if it is esm', () => {
        expect(
            getDefaultExport({
                something: 'hello',
                __esModule: true,
                default: {
                    another: 'hello',
                },
            }),
        ).toStrictEqual({ another: 'hello' });
    });
});
