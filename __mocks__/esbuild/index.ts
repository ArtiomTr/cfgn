const esbuild = jest.requireActual('esbuild');

export const build = jest.fn(esbuild.build);
