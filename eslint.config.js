import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.config.js']
  },
  js.configs.recommended,
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime'
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  })
];
