// CommonJS require (this .js setup file is not run through the ts-jest transform,
// so an ESM `import` here throws "Cannot use import statement outside a module").
require('@testing-library/jest-dom');

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});
