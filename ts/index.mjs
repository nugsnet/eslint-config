import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'


export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,mts}'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2, {
        'SwitchCase': 1,
        'ignoredNodes': [
          'TemplateLiteral *'
        ]
      }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'ignoreRestSiblings': true,
          'argsIgnorePattern': '^_$',
          'caughtErrors': 'none'
        }
      ],
      '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/type-annotation-spacing': 'off'
    }
  }
)