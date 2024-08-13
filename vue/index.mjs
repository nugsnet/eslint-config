import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default {
  files: ['*.vue', '**/*.vue'],
  ...pluginVue.configs['flat/recommended'],
  ...pluginVue.configs['flat/essential'],
  ...tseslint.configs.recommended,
  languageOptions: {
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: {
        ts: '@typescript-eslint/parser', 
        '<template>': 'espree'
      }
    }
  },
  rules: {
    'vue/no-setup-props-destructure': 0,
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
    }],
    'vue/multi-word-component-names': 0
  }
}