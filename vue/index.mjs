import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'


export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: { parser: tseslint.parser }
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-destructure': 'off',
      'vue/script-indent': [
        'error',
        2,
        {
          'baseIndent': 1,
          'switchCase': 1,
          'ignores': []
        }
      ],
      'vue/html-indent': [
        'error',
        2,
        {
          'attribute': 1,
          'baseIndent': 1,
          'closeBracket': 1,
          'alignAttributesVertically': true,
          'ignores': []
        }
      ],
      'vue/html-closing-bracket-spacing': ['error', {
        'startTag': 'never',
        'endTag': 'never',
        'selfClosingTag': 'always'
      }],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          'singleline': 'never',
          'multiline': 'never'
        }
      ],
      'vue/max-attributes-per-line': ['error', {
        'singleline': {
          'max': 5
        },
        'multiline': {
          'max': 1
        }
      }]
    }
  }
]