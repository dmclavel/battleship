module.exports = {
  root: true, // Indicates that this is the root ESLint configuration file
  parser: '@typescript-eslint/parser', // Specifies the TypeScript parser to use
  parserOptions: {
    ecmaVersion: 2021, // Specifies the ECMAScript version to use
    sourceType: 'module', // Specifies the source type (e.g., 'module' for ECMAScript modules)
    project: './tsconfig.json', // Specifies the path to your TypeScript configuration file
  },
  extends: [
    'eslint:recommended', // Extends the recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Extends the recommended TypeScript ESLint rules
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  ignorePatterns: ['node_modules', 'dist'],
  plugins: [
    '@typescript-eslint', // Adds the TypeScript ESLint plugin
    // Add any additional plugins you want to use
  ],
  env: {
    // Specifies the environment where your code will run
    // e.g., 'browser' for a web browser, 'node' for Node.js
    // You can specify multiple environments as an object
    browser: true,
    node: true,
    es6: true,
  },
};
