/* eslint sort-keys: "error" -- Organise rules */

import { globals, makeEslintConfig } from '@averay/codeformat';

// Patch globals library
delete globals.browser['AudioWorkletGlobalScope '];

export default [
  {
    ignores: ['coverage/**/*', 'dist/**/*'],
  },
  ...makeEslintConfig({ tsconfigPath: './tsconfig.json' }),
  {
    files: ['test/**/*'],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, NodeJS: 'readonly' },
    },
  },
  {
    files: ['src/**/*'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2015 },
    },
  },
];
