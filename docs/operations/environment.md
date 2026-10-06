# Environment

Read this for first-time local setup, and before you lint a consumer against this checkout.

## 1. Prerequisites

| Tool | Version | Source of truth |
| --- | --- | --- |
| pnpm | 12.9.1 | `packageManager` in `package.json` |
| Node | No constraint declared | `package.json` has no `engines`. The publish workflow runs Node 24 |

Every dependency comes from the public npm registry. `.npmrc` maps the `@nugsnet` scope to GitHub Packages, but this package depends on nothing in that scope, so an install needs no token.

## 2. Install

```bash
pnpm i --frozen-lockfile
```

`pnpm-workspace.yaml` sets `autoInstallPeers: true` and a list of security `overrides`. Both apply to this repository's install only; a consumer resolves the dependency tree with its own settings.

There is no `prepare` script and there are no git hooks, so nothing runs on commit or push.

## 3. Editor

`nugsnet-eslint-config.code-workspace` turns on ESLint as the formatter for JavaScript and TypeScript and runs the Stylelint fix on save. Its `stylelint.configFile` points at `.stylelintrc`, which does not exist in this repository.

## 4. Linting a consumer against this checkout

The sibling checkouts under `../` are the consumers. To see what a change here does to one of them, run its linter against this checkout from the consumer's own directory. Both commands read the consumer's files and write nothing.

```bash
cd ../web-sdk
pnpm exec eslint --config ../eslint-config/index.mjs src tests
```

```bash
cd ../get.nugs.net
pnpm exec stylelint --config ../eslint-config/stylelint.js "src/**/*.{scss,vue}"
```

ESLint loads `index.mjs` from this checkout, resolves the plugins from this checkout's `node_modules`, and uses the consumer's directory as its base path — `--debug` prints `Using config file …/eslint-config/index.mjs and base path …/web-sdk`. `--config` replaces the consumer's own config file, so its additions are not applied: Stylelint in `get.nugs.net` reports `color-hex-length` errors that the consumer's `.stylelintrc` turns off. Run the command before and after your change, and read only the difference.

Take each consumer's lint paths from its own `lint` script. Never add `--fix`, and never add `--cache` — the cache file would be written into the consumer.

PostCSS has no equivalent check. `AGENTS.md` section 9 explains why.

## 5. Publishing

Publishing runs only in CI, from `.github/workflows/release-package.yml`, when a GitHub Release is created. `AGENTS.md` section 10 is the process.
