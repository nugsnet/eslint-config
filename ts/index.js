module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": 2021,
        "allowImportExportEverywhere": true,
        "sourceType": "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
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
        "comma-dangle": ["error", "only-multiline"],
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