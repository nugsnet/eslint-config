import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'comma-dangle': ['error', 'only-multiline'],
      '@typescript-eslint/type-annotation-spacing': [
        'error',
        {
          'before': false,
          'after': true,
          'overrides': {
            'arrow': {
              'before': true,
              'after': true
            }
          }
        }
      ]
    }
  }
)