require("@rushstack/eslint-patch/modern-module-resolution")

const config = {
  root: true,
  env: {
    es2022: true,
    browser: true
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "public/"
  ],
  parser: "@babel/eslint-parser",
  extends: ["eslint:recommended"],
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
  overrides: [
    {
      files: [
        "**/*.vue"
      ],
      extends: [
        "./vue"
      ]
    },
    {
      files: [
        "**/*.ts",
        "**/*.tsx"
      ],
      extends: [
        "./ts"
      ]
    }
  ]
}

// eslint config
module.exports = config