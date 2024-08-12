import path from "node:path"
import { fileURLToPath } from "node:url"

import vue from "eslint-plugin-vue"
import parser from "vue-eslint-parser"
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

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
        "plugin:vue/vue3-recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ]),
    {
        plugins: {
            vue,
        },
        languageOptions: {
            parser: parser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                parser: {
                    ts: "@typescript-eslint/parser",
                    "<template>": "espree",
                },
            },
        },
        rules: {
            indent: "off",
            "vue/no-setup-props-destructure": 0,
            "vue/script-indent": ["error", 2, {
                baseIndent: 1,
                switchCase: 1,
                ignores: [],
            }],
            "vue/html-indent": ["error", 2, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 1,
                alignAttributesVertically: true,
                ignores: [],
            }],
            "vue/html-closing-bracket-newline": ["error", {
                singleline: "never",
                multiline: "never",
            }],
            "vue/max-attributes-per-line": ["error", {
                singleline: {
                    max: 5,
                },

                multiline: {
                    max: 1,
                },
            }],
            "vue/multi-word-component-names": 0,
        },
    }
]
