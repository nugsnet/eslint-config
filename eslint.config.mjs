import vue from './vue/index.mjs'
import ts from './ts/index.mjs'

import globals from 'globals'

export default [
  { 
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,vue}'],
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      'no-console': [
        'warn', {
          allow: ['warn', 'error']
        }
      ],
      'object-curly-spacing': [
        'error',
        'always',
        {
          'arraysInObjects': true,
          'objectsInObjects': true
        }
      ],
      'comma-spacing': [
        'error',
        {
          'before': false,
          'after': true
        }
      ],
      'key-spacing': [
        'error',
        {
          'afterColon': true,
          'beforeColon': false
        }
      ],
      'object-curly-newline': [
        'error',
        {
          'ImportDeclaration': {
            'consistent': true,
            'multiline': true
          },
          'ObjectPattern': {
            'consistent': true,
            'multiline': true
          }
        }
      ],
      'arrow-parens': [
        'error',
        'as-needed'
      ],
      'comma-dangle': [
        'error',
        'never'
      ],
      'no-multi-spaces': 'error',
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single',
        {
          'allowTemplateLiterals': true
        }
      ],
      'space-infix-ops': [
        'error',
        {
          'int32Hint': false
        }
      ],
      'keyword-spacing': [
        'error',
        {
          'before': true
        }
      ],
      'space-before-blocks': [
        'error',
        'always'
      ],
      'semi': [
        'error',
        'never'
      ]
    }
  },
  ...ts,
  ...vue
]