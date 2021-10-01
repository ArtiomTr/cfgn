export const readFile = jest.fn().mockName('readFile');

export const access = jest.fn().mockName('access');

const actualModule = jest.requireActual('fs-extra');

export const constants = actualModule.constants;
