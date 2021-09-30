import { dirname, resolve } from 'path';

export default {
    hello: 'world',
    somepath: resolve(dirname(__filename), 'something'),
};
