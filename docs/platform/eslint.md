# The ESLint config

Read this before you change `index.mjs`, `eslint.config.mjs`, `ts/index.mjs`, or `vue/index.mjs`. It describes what the published ESLint config is made of, which files each part reaches, and the traps in it today. For the meaning of a rule, read the rule's own reference; this document says only what this package sets and why.

## 1. How the config is built

A consumer imports the root of the package, which is `index.mjs` (`main` in `package.json`). The config is a flat config array, and the entries compose in this order:

| # | Entry | Comes from | Reaches |
| --- | --- | --- | --- |
| 1 | Browser globals, `warnOnUnsupportedTypeScriptVersion: false` | `eslint.config.mjs` | `**/*.{js,mjs,cjs,ts,tsx,mts,vue}` |
| 2 | `@eslint/js` recommended | `ts/index.mjs` | Every linted file |
| 3 | `typescript-eslint` recommended | `ts/index.mjs` | Every linted file (its `eslint-recommended` part targets TypeScript files only) |
| 4 | The TypeScript block | `ts/index.mjs` | `**/*.{ts,tsx,mts}` |
| 5 | `@eslint/js` recommended, again | `vue/index.mjs` | Every linted file |
| 6 | `typescript-eslint` recommended, again | `vue/index.mjs` | As entry 3 |
| 7 | `eslint-plugin-vue` `flat/recommended`, then `flat/essential` | `vue/index.mjs` | `.vue` files |
| 8 | The Vue block | `vue/index.mjs` | `**/*.vue` |
| 9 | The shared rules | `eslint.config.mjs` | Every linted file — the block has no `files` pattern |
| 10 | The ignore list | `index.mjs` | The consumer's whole project |

In a flat config the later entry wins. When a later entry sets a rule with a severity only, ESLint keeps the options an earlier entry gave it — that is why entry 6 does not erase the options entry 4 sets on `@typescript-eslint/no-unused-vars` for TypeScript files.

`pnpm exec eslint --print-config <file>` prints the final result for one file. Use it instead of reasoning about the order.

## 2. What each part sets

**The TypeScript block** (`ts/index.mjs`, `**/*.{ts,tsx,mts}`):

| Rule | Value | Why it matters |
| --- | --- | --- |
| `@stylistic/indent` | 2 spaces, `SwitchCase: 1`, template literals ignored | The only indentation rule for `.ts` files |
| `@typescript-eslint/no-unused-vars` | `ignoreRestSiblings`, `argsIgnorePattern: '^_$'`, `caughtErrors: 'none'` | Only a bare `_` argument is ignored — `_event` is still reported |
| `@stylistic/comma-spacing` · `@stylistic/object-curly-spacing` · `@stylistic/comma-dangle` | As the shared core rules | Duplicates of three shared rules — section 4 |
| `@stylistic/type-annotation-spacing` | `off` | |

**The Vue block** (`vue/index.mjs`, `**/*.vue`):

| Rule | Value |
| --- | --- |
| Parser | `vue-eslint-parser`, with `typescript-eslint`'s parser for `<script>` |
| `vue/script-indent` | 2 spaces, `baseIndent: 1` — script content sits one level inside `<script>` |
| `vue/html-indent` | 2 spaces, `baseIndent: 1`, attributes one level in, attributes aligned vertically |
| `vue/html-closing-bracket-spacing` | No space before `>` · a space before `/>` |
| `vue/html-closing-bracket-newline` | The closing bracket stays on the last line, single-line or multi-line |
| `vue/max-attributes-per-line` | Five on one line, one per line once the tag wraps |
| `vue/multi-word-component-names` · `@typescript-eslint/explicit-function-return-type` · `vue/no-setup-props-destructure` | `off` |

The `baseIndent: 1` pair is the source of the "one level inside `<template>` and `<script>`" convention every Vue consumer follows.

**The shared rules** (`eslint.config.mjs`, last block):

| Rule | Value |
| --- | --- |
| `no-console` | `warn`, `console.warn` and `console.error` allowed — the only `warn` in the config |
| `semi` | `never` |
| `quotes` | `single`, template literals allowed |
| `linebreak-style` | `unix` |
| `comma-dangle` | `only-multiline` |
| `arrow-parens` | `as-needed` |
| `object-curly-spacing` · `comma-spacing` · `key-spacing` · `object-curly-newline` · `space-infix-ops` · `keyword-spacing` · `space-before-blocks` · `no-multi-spaces` | Spacing and layout |
| `no-unused-expressions` · `@typescript-eslint/no-unused-expressions` | `off` |

**The ignore list** (`index.mjs`): `node_modules`, `dist`, `build`, `public`, `bin`, `bundle`, `src/assets`, `.postcssrc.js`. A consumer adds its own ignores on top — `web-player` and `ssr-kit` do.

## 3. What consumers add

Most consumers re-export the config as it is. Three extend it:

- `web-player` adds ignores (`postcssrc.cjs` among them).
- `ssr-kit` adds ignores (`.histoire`).
- `chromecast-receiver` adds `no-restricted-syntax` and `no-restricted-globals` for `src/**/*.ts`, because its bundle targets Chrome 66 and esbuild does not polyfill builtins.

A change to the ignore list or to a rule those consumers also set interacts with their additions. Read their `eslint.config.mjs` before you change it.

## 4. Known traps

Each item below is true of the code today. None of them is fixed here; each one is a change a consumer can observe, so fixing one is a Feature-lane change.

- **TypeScript options do not reach `.vue` files.** The options on `@typescript-eslint/no-unused-vars` live in the TypeScript block, which matches `**/*.{ts,tsx,mts}` only. In a `.vue` file the rule runs with no options: an unused `catch` binding, a rest sibling, and a bare `_` argument are all reported there and not in a `.ts` file. `--print-config vue/Test.vue` shows `[2]`; `--print-config index.d.ts` shows the options. The same source piped through `--stdin` reports three `no-unused-vars` findings as `probe.vue` and none as `probe.ts`.
- **Thirteen shared rules are deprecated.** `semi`, `quotes`, `comma-spacing`, `comma-dangle`, `key-spacing`, `object-curly-spacing`, `object-curly-newline`, `arrow-parens`, `no-multi-spaces`, `linebreak-style`, `space-infix-ops`, `keyword-spacing`, and `space-before-blocks` are core formatting rules that ESLint deprecated in 8.53.0 in favour of `@stylistic/eslint-plugin`. ESLint 10 still ships them. The TypeScript block already uses `@stylistic/*` for three of them, so TypeScript files run both versions of those three.
- **Two presets appear twice.** `@eslint/js` recommended and `typescript-eslint` recommended are included by both `ts/index.mjs` and `vue/index.mjs`. The second copy sets the same values again.
- **`flat/essential` follows `flat/recommended`.** `flat/recommended` already contains the `essential` rules, so the second preset adds nothing.
- **`vue/no-setup-props-destructure` does not exist** in the installed `eslint-plugin-vue` 10. The entry is `off`, and the lint run still passes.
- **Only browser globals are declared.** A CommonJS or Node file that ESLint lints reports `no-undef` on `module` and `require`. That is why `stylelint.js` and `postcss.js` open with `eslint-disable` headers. `typescript-eslint` turns `no-undef` off for TypeScript files, so a consumer's `vite.config.ts` is not affected.
- **This repository's own lint does not load `index.mjs`.** `pnpm exec eslint .` finds `eslint.config.mjs` at the root, so the ignore list is never exercised here.

## 5. Verifying a change

`AGENTS.md` section 9 is the procedure: `pnpm exec eslint .` here, `--print-config` for the rule you changed, and the consumer check before and after the change in every consumer the change can reach.
