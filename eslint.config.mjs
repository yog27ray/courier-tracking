import importPlugin from 'eslint-plugin-import';
import _eslintJs from '@eslint/js';
const { configs: jsConfigs } = _eslintJs;
import promisePlugin from 'eslint-plugin-promise';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import perfectionist from 'eslint-plugin-perfectionist'; // for deterministic import/object sorting

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.d.ts',
      '**/*.d.cts',
      '**/*.d.mts',
    ],
  },
  jsConfigs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        projectService: true,
        sourceType: 'module',
        tsconfigRootDir: process.cwd(),
      },
      globals: { ...globals.node },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      '@typescript-eslint': tsPlugin,
      perfectionist,
    },
    settings: {
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'] },
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...((tsPlugin.configs['recommended-type-checked'] || {}).rules || {}),
      ...((tsPlugin.configs['stylistic-type-checked'] || {}).rules || {}),
      ...((perfectionist.configs['recommended-natural'] || {}).rules || {}),
      '@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      "@typescript-eslint/prefer-nullish-coalescing": [0],
      'max-len': ['error', 140],
      'promise/no-callback-in-promise': [0],
      '@typescript-eslint/no-unsafe-call': [0],
      'class-methods-use-this': [0],
      'import/prefer-default-export': [0],
      'key-spacing': 'error',
      'import/named': [0],
      'import/no-unresolved': [0],
      'object-curly-spacing': ['error', 'always'],
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: ['state', 'draft'], // common Immer aliases
      }],
      '@typescript-eslint/no-unused-vars': ['error', {
        vars: 'local',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      }],
      'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
      'import/extensions': ['error', 'ignorePackages', { 'js': 'never', 'jsx': 'never', 'ts': 'never', 'tsx': 'never' }],
      "no-undef": 0,
    },
  },

  // Type declaration files: relax some checks
  {
    files: ['**/*.d.ts', '**/*.d.cts', '**/*.d.mts'],
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      quotes: 'off',
    },
  },

  // Tests
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '*.spec.ts', '*.test.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/require-await': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-unused-expressions': 'off',
      'max-classes-per-file': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'promise/no-callback-in-promise': 'off',
    },
  },
];
