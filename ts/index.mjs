import path from "node:path"
import { fileURLToPath } from "node:url"


import typescriptEslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import js from "@eslint/js"

import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [
    {
        ignores: [
            "node_modules/",
            "dist/",
            "bin/",
            "build/",
            "public/",
        ],
    },
    ...compat.extends.apply(compat, [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ]), {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2021,
            sourceType: "module",

            parserOptions: {
                parser: "@typescript-eslint/parser",
                allowImportExportEverywhere: true,
            },
        },
        rules: {
            "@typescript-eslint/indent": ["error", 2, {
                SwitchCase: 1,
                ignoredNodes: ["TemplateLiteral *"],
            }],
            "comma-dangle": ["error", "only-multiline"],
            "@typescript-eslint/type-annotation-spacing": ["error", {
                before: false,
                after: true,
                overrides: {
                    arrow: {
                        before: true,
                        after: true,
                    },
                },
            }],
        },
    }
]