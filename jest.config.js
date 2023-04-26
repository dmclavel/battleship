module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  setupFilesAfterEnv: [
    './src/setupTests.ts',
  ],
};
