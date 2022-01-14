module.exports = {
  globals: {
    "process": "readonly",
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  plugins: [
    "@typescript-eslint"
  ],
  parserOptions: {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2021,
    "allowImportExportEverywhere": true,
    "sourceType": "module"
  },
  ignorePatterns: [
    "node_modules/",
    "dist/"
  ],
  env: {
    "browser": true,
    "es6": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true
      }
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "key-spacing": [
      "error",
      {
        "afterColon": true,
        "beforeColon": false
      }
    ],
    "object-curly-newline": [
      "error",
      {
        "ImportDeclaration": {
          "consistent": true,
          "multiline": true
        },
        "ObjectPattern": {
          "consistent": true,
          "multiline": true
        }
      }
    ],
    "max-classes-per-file": [
      "error",
      5
    ],
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "comma-dangle": [
      "error",
      "never"
    ],
    "no-multi-spaces": "error",
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "space-infix-ops": [
      "error",
      {
        "int32Hint": false
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true
      }
    ],
    "space-before-blocks": [
      "error",
      "always"
    ],
    "semi": [
      "error",
      "never"
    ]
  },
  "overrides": [
    {
      "parser": "@typescript-eslint/parser",
      "files": [
        "**/*.ts",
        "**/*.tsx"
      ],
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "rules": {
        "@typescript-eslint/indent": [
          "error",
          2,
          {
            "SwitchCase": 1,
            "ignoredNodes": [
              "TemplateLiteral *"
            ]
          }
        ],
       
        "@typescript-eslint/type-annotation-spacing": [
          "error",
          {
            "before": false,
            "after": true,
            "overrides": {
              "arrow": {
                "before": true,
                "after": true
              }
            }
          }
        ]
      }
    }
  ]
}
