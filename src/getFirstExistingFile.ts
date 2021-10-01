import { access, constants } from 'fs-extra';

export class NoFilesFoundError extends Error {
    constructor(files: string[]) {
        super(`Could not resolve any file from the given array: ${files.join(', ')})`);
    }
}

export const getFirstExistingFile = async (paths: string[]): Promise<[path: string, index: number]> => {
    for (let i = 0; i < paths.length; i++) {
        const possiblePath = paths[i];

        try {
            await access(possiblePath, constants.R_OK);

            return [possiblePath, i];
        } catch (err) {
            /* ignore error */
        }
    }

    throw new NoFilesFoundError(paths);
};
