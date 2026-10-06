# The PostCSS config

Read this before you change `postcss.js`. The PostCSS config runs inside every consumer's build, so a change here changes the CSS that every consumer serves. For what a plugin does in detail, read the plugin's own reference.

## 1. What it is

`postcss.js` is a CommonJS module that exports `parser` and `plugins`. A consumer loads it from its `.postcssrc.mjs`:

```js
import config from '@nugsnet/eslint-config/postcss.js'

export default config
```

Seven consumers do exactly this: `web-player`, `get.nugs.net`, `account.nugs.net`, `redeem.nugs.net`, `playdead-landing`, `websdk-widgets`, and `chromecast-receiver`, plus the `ssr-kit` template. Renaming the file breaks every one of them — `AGENTS.md` section 4.

## 2. The parser

`parser` is the `postcss-scss` module, so the plugins see SCSS syntax — `//` comments and nested rules — without a parse error. `postcss.d.ts` types it as a `string`, which is wrong (`AGENTS.md` section 6).

## 3. The plugins, in order

PostCSS runs the plugins in array order. The order is part of the contract.

| # | Plugin | Options | What it does to a consumer's CSS |
| --- | --- | --- | --- |
| 1 | `postcss-preset-env` | `autoprefixer: { flexbox: false, grid: false }` | Lowers modern CSS for the consumer's browser targets and adds vendor prefixes — but no prefixes for flexbox or grid |
| 2 | `postcss-flexbugs-fixes` | — | Rewrites flexbox declarations that trigger known browser bugs |
| 3 | `postcss-input-range` | — | Expands the unprefixed `::range-track` and `::range-thumb` selectors into their vendor forms |
| 4 | `postcss-scrollbar` | — | Generates `::-webkit-scrollbar` rules from the standard scrollbar properties |
| 5 | `postcss-pxtorem` | `replace: true`, `propList: ['font', 'font-size', 'line-height']` | Converts `px` to `rem` for those three properties only, at the plugin's default root value of 16. Every other property keeps its `px` |
| 6 | `restore-node-source` | — | Written in this file. Re-attaches a `source` to every node that lacks one |

This package sets no browser targets. `postcss-preset-env` and its Autoprefixer read the consumer's own browserslist configuration.

## 4. Why `restore-node-source` stays last

Some plugins create rules and declarations without copying `source` from the node they came from — `postcss-scrollbar` does, for the `::-webkit-scrollbar` rules it builds. A bundler reads `source.input.file` to resolve a relative `url()`, so Vite warned "A PostCSS plugin did not pass the `from` option to `postcss.parse`" for every such node.

`restore-node-source` runs in `OnceExit`, walks the tree depth-first, and gives each node without a `source` the source of its parent, or of the root. It fixes only nodes that exist when it runs, so **it must stay the last plugin**: a plugin added after it can create sourceless nodes again, and the warning returns. Commit `94706f6` introduced it.

## 5. What is already in the preset

`postcss-preset-env` bundles many single-feature plugins. Adding one of those beside it runs the transform twice and duplicates the generated fallbacks. Commit `94706f6` removed three that were listed twice — `postcss-place`, `postcss-gap-properties`, and `@csstools/postcss-logical-viewport-units`. Read the preset's plugin list before you add a plugin here.

## 6. Verifying a change

There is **no verified consumer check** for PostCSS. A consumer loads this file from its own `node_modules`, and making it load this checkout instead needs a `link:` dependency — a change to that consumer's `package.json` and lockfile, which needs the developer's approval (`AGENTS.md` section 9). Until a check is agreed, say plainly in the PR that a PostCSS change was not verified in a consumer.
