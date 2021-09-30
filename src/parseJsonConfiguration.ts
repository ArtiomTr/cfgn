import { readFile } from 'fs-extra';

export const parseJsonConfiguration = async (file: string) => {
    const fileContents = await readFile(file);

    return JSON.parse(fileContents.toString());
};
