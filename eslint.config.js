import { makeEslintConfig } from '@averay/codeformat';
import globals from 'globals';

// Patch globals library
delete globals.browser['AudioWorkletGlobalScope '];

export default [
  {
    ignores: ['dist/**/*'],
  },
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
  ...makeEslintConfig({ tsconfigPath: './tsconfig.json' }),
];
