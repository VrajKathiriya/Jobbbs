import { builtinModules } from 'node:module';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const pureMessage =
  'packages/core is pure: inject I/O and the clock instead (see CLAUDE.md, Architecture).';

const bannedGlobals = [
  // Node and Deno runtimes
  'process',
  'Deno',
  'Buffer',
  'require',
  '__dirname',
  '__filename',
  'global',
  // Browser-only (the DOM lib is loaded for shared web-platform types)
  'window',
  'document',
  'navigator',
  'localStorage',
  'sessionStorage',
  // I/O is injected
  'fetch',
];

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: builtinModules.map((name) => ({ name, message: pureMessage })),
          patterns: [{ group: ['node:*'], message: pureMessage }],
        },
      ],
      'no-restricted-globals': [
        'error',
        ...bannedGlobals.map((name) => ({ name, message: pureMessage })),
      ],
      'no-restricted-properties': [
        'error',
        { object: 'Date', property: 'now', message: pureMessage },
        ...bannedGlobals.map((property) => ({
          object: 'globalThis',
          property,
          message: pureMessage,
        })),
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "NewExpression[callee.name='Date'][arguments.length=0]",
          message: pureMessage,
        },
      ],
    },
  },
  prettier,
]);
