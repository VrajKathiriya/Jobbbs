import { builtinModules } from 'node:module';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const pureMessage =
  'packages/core is pure: inject I/O and the clock instead (see CLAUDE.md, Architecture).';

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
        ...['process', 'Deno', 'Buffer', 'require', '__dirname', '__filename', 'global'].map(
          (name) => ({ name, message: pureMessage }),
        ),
      ],
    },
  },
  prettier,
]);
