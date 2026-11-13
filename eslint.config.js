// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: ['dist/**', '.wrangler/**', 'worker/worker-configuration.d.ts'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    rules: {
      'consistent-return': 'error',
      indent: ['error', 2],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'space-unary-ops': 'error',
    },
  },
)
