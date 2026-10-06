# The Stylelint config

Read this before you change `stylelint.js`. It describes what the published Stylelint config sets and what consumers set on top of it. For the meaning of a rule, read the rule's own reference.

## 1. What it is

`stylelint.js` is a CommonJS module. A consumer loads it from its `.stylelintrc`:

```json
{
  "extends": "@nugsnet/eslint-config/stylelint"
}
```

There is no `exports` map, so `@nugsnet/eslint-config/stylelint` resolves to the file `stylelint.js`. Renaming that file breaks every consumer — `AGENTS.md` section 4.

## 2. What it sets

| Part | Value | Why |
| --- | --- | --- |
| `extends` | `stylelint-config-standard-scss` | The SCSS rules. It extends `stylelint-config-standard` itself, so that preset is not listed again |
| `extends` | `stylelint-config-standard-vue/scss` | The same rules for the `<style>` blocks of `.vue` files. Its `overrides` entry for `*.vue` pulls in `stylelint-config-html`, which parses the file with `postcss-html` — `--print-config vue/Test.vue` shows `customSyntax: postcss-html` |
| `selector-class-pattern` | `null` | Components use CSS Modules with PascalCase root classes (`.SomeComponent` in `vue/Test.vue`). `stylelint-config-standard` requires kebab-case class names, so it rejects them |

`postcss-html` is a peer dependency of `stylelint-config-standard-vue`. It is listed in `dependencies` and in `optionalDependencies` of this package.

## 3. Resolution under pnpm

Every preset in `extends` must be a declared dependency of this package. pnpm does not hoist undeclared packages, so an undeclared preset fails to load in every consumer with `ConfigurationError: Could not find "<name>"`. That is what happened to `stylelint-config-standard` until commit `94706f6` removed the entry — the v1.9.6 release notes record the error.

## 4. What consumers override

Every consumer's `.stylelintrc` extends this config and then changes rules. Read theirs before you change a rule here:

| Rule | Consumers that set it |
| --- | --- |
| `selector-class-pattern: null` | All seven — the value this config already sets |
| `color-hex-length: "long"` | `account.nugs.net`, `get.nugs.net`, `playdead-landing`, `redeem.nugs.net`, `ssr-kit` |
| `declaration-block-no-redundant-longhand-properties: null` | `account.nugs.net`, `redeem.nugs.net`, `web-player`, `websdk-widgets` |
| `declaration-property-value-no-unknown: null` | `account.nugs.net`, `web-player`, `websdk-widgets` |
| `no-descending-specificity: null` | `web-player`, `websdk-widgets` |

`web-sdk` and `chromecast-receiver` have no Stylelint config.

A setting that most consumers repeat is a candidate to move here. Moving one is still a behaviour change for the consumers that do not set it — `web-player` and `websdk-widgets` would start to get `color-hex-length: "long"` — so it is a Feature-lane change with a consumer check.

## 5. Verifying a change

Run the consumer check from `AGENTS.md` section 9 before and after the change. `--config` replaces the consumer's `.stylelintrc`, so the run reports the rules in the table above as findings; only the difference between the two runs is your change.
