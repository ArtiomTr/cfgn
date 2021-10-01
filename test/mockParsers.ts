import { mocked } from 'ts-jest/utils';

import { parseEsmConfiguration } from '../src/parseEsmConfiguration';
import { parseJsConfiguration } from '../src/parseJsConfiguration';
import { parseJsonConfiguration } from '../src/parseJsonConfiguration';
import { parseTsConfiguration } from '../src/parseTsConfiguration';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

declare global {
    namespace jest {
        interface Matchers<R> {
            toBeCalledOnlyThisParser: () => R;
        }
    }
}

export const mockParsers = () => {
    const mocksArray = [
        mocked(parseEsmConfiguration),
        mocked(parseJsConfiguration),
        mocked(parseJsonConfiguration),
        mocked(parseTsConfiguration),
    ];

    beforeEach(() => {
        mocksArray.forEach((m) => m.mockClear());
    });

    expect.extend({
        toBeCalledOnlyThisParser: (received: jest.MockedFunction<AnyFunction>) => {
            let passed = true;
            for (const el of mocksArray) {
                if (el === received && el.mock.calls.length === 0) {
                    passed = false;
                }

                if (el !== received && el.mock.calls.length > 0) {
                    passed = false;
                }
            }

            const receivedNames = mocksArray.map((fn) => fn.getMockName()).join(', ');

            if (passed) {
                return {
                    message: () =>
                        `expected not to be callen only ${received.getMockName()} from array [${receivedNames}]`,
                    pass: true,
                };
            } else {
                return {
                    message: () => `expected to be callen only ${received.getMockName()} from array [${receivedNames}]`,
                    pass: false,
                };
            }
        },
    });
};
