import path from "node:path";

import { fileURLToPath } from "node:url"

import globals from "globals"
import babelParser from "@babel/eslint-parser"
import js from "@eslint/js"

import { FlatCompat } from "@eslint/eslintrc"

import vue from "./vue"
import ts from "./ts"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended"),
    {
        ignores: ["**/node_modules/", "**/dist/", "**/build/", "**/public/"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                process: "readonly",
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },

            parser: babelParser,
        },

        rules: {
            "no-console": ["warn", {
                allow: ["warn", "error"],
            }],

            "object-curly-spacing": ["error", "always", {
                arraysInObjects: true,
                objectsInObjects: true,
            }],

            "comma-spacing": ["error", {
                before: false,
                after: true,
            }],

            "key-spacing": ["error", {
                afterColon: true,
                beforeColon: false,
            }],

            "object-curly-newline": ["error", {
                ImportDeclaration: {
                    consistent: true,
                    multiline: true,
                },

                ObjectPattern: {
                    consistent: true,
                    multiline: true,
                },
            }],

            "arrow-parens": ["error", "as-needed"],
            "comma-dangle": ["error", "never"],
            "no-multi-spaces": "error",
            "linebreak-style": ["error", "unix"],

            quotes: ["error", "single", {
                allowTemplateLiterals: true,
            }],

            "space-infix-ops": ["error", {
                int32Hint: false,
            }],

            "keyword-spacing": ["error", {
                before: true,
            }],

            "space-before-blocks": ["error", "always"],
            semi: ["error", "never"],
        },
    }, 
    {
        files: ["**/*.vue", "**/*.vue"],
        ...vue,
    }, 
    {
        files: ["**/*.ts", "**/*.tsx"],
        ...ts,
    }
]
