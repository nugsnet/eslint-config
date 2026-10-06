# Code Style — Config Files

Read this before any change to a config file (`index.mjs`, `eslint.config.mjs`, `ts/`, `vue/`, `stylelint.js`, `postcss.js`) or a declaration (`*.d.ts`), including a one-line edit. `AGENTS.md` holds the rules that govern how you work; this document holds the shape the code itself must take. Where the two overlap, they agree — if you find them disagreeing, that is a defect in one of them: raise it, do not pick silently.

Tooling: ESLint, through this repository's own `eslint.config.mjs`. `pnpm exec eslint .` runs it. Never fix a lint error by hand-editing around it — fix the code the linter points at.

## 1. Module formats

| Files | Format | Why |
| --- | --- | --- |
| `index.mjs`, `eslint.config.mjs`, `ts/index.mjs`, `vue/index.mjs` | ESM | ESLint flat config is loaded as a module, and consumers `import` the root |
| `stylelint.js`, `postcss.js` | CommonJS (`module.exports`, `require`) | Both are loaded by other tools' config loaders, and a consumer's `.postcssrc.mjs` default-imports `postcss.js` |

Keep each file in its format. Converting one is a change to how every consumer loads it — a Feature-lane change with a consumer check.

## 2. Formatting

- Single quotes, no semicolons, LF endings. The base config enforces these for every file ESLint lints here.
- 2-space indentation. It is enforced for TypeScript and Vue only. `index.mjs` and `postcss.js` use 4 spaces and predate this rule: follow the file you are in, and use 2 spaces in a new file.
- Rule option keys are quoted in the ESLint layers (`'SwitchCase': 1`, `'baseIndent': 1`). Keep that inside those files.

## 3. Blank-line grouping

Group related statements and put a blank line between logical sections: imports, local declarations, the exported value. A reader must see the shape of the file without reading it. This is required in every file, not a stylistic preference.

**BAD**:

```js
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
const extra = ['bundle']
export default defineConfig(eslint.configs.recommended, { ignores: extra })
```

**GOOD**:

```js
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'

const extra = ['bundle']

export default defineConfig(eslint.configs.recommended, { ignores: extra })
```

Never pack unrelated statements into one block, and never scatter a single thought across blank lines. `eslint.config.mjs` and `vue/index.mjs` carry a double blank line inside their imports today; one is enough in new code.

## 4. Where a setting goes

| The setting applies to | Put it in | Its `files` pattern |
| --- | --- | --- |
| TypeScript files only | The block in `ts/index.mjs` | `**/*.{ts,tsx,mts}` |
| Vue files only | The block in `vue/index.mjs` | `**/*.vue` |
| Every file ESLint lints | The last block of `eslint.config.mjs` | None — it reaches everything |
| What a consumer never lints | The ignore list in `index.mjs` | — |
| SCSS and Vue styles | `stylelint.js` | Stylelint's own `overrides` handle `.vue` |
| Consumer CSS output | The plugin list in `postcss.js` | — |

Before you add a rule, find every place it is already set — a preset, another layer, the shared block — and run `pnpm exec eslint --print-config <file>` for each file type it reaches. [`../platform/eslint.md`](../platform/eslint.md) lists the places that already conflict.

Prefer `@stylistic/*` for a new formatting rule. The core formatting rules in the shared block are deprecated; do not add another one.

## 5. Writing an entry

- Severity is a string: `'error'`, `'warn'`, or `'off'` — the way every entry in the layers is written. `error` is the default choice; `warn` needs a reason (`AGENTS.md` section 7).
- One rule per key, with its options inline beside it.
- Set a rule only when the value differs from what a preset already gives it. An entry that repeats the preset is dead weight.
- A rule name must exist in the installed plugin version. `vue/no-setup-props-destructure` is an entry that no longer does — do not copy it.
- A preset in `extends`, and every plugin you `import` or `require`, must be in `dependencies`. Consumers receive them through this package, and pnpm resolves nothing that is not declared.

## 6. Comments

Every module carries a comment that states the concern it owns. Every non-obvious rule, option, or plugin carries a comment that says **why** it is set — the symptom it prevents, or the need behind it. The block comment above `restoreNodeSource` in `postcss.js` is the model: it names the plugin that loses `source`, the warning a consumer saw, and what the fix does.

**BAD** — restates the entry:

```js
// Turn off multi-word component names.
'vue/multi-word-component-names': 'off',
```

**GOOD** — says what the entry cannot:

```js
// Every Vue consumer has one-word components (`App.vue`, `Plans.vue`, `Search.vue`).
'vue/multi-word-component-names': 'off',
```

Most existing entries carry no comment. They predate this rule and are not precedent; add the reason when you change one.

## 7. Declarations

The `.d.ts` files are hand-written and must describe what the module really exports. Three of them do not today — `AGENTS.md` section 6 lists the gaps. When you change the shape of an export, change its declaration in the same commit. `USAGE.md` describes a `tsc` command for regenerating them that names `index.js`, a file that does not exist; do not rely on it.

## 8. No suppressions

Never write an `eslint-disable`, a `@ts-ignore`, a `@ts-expect-error`, or an `any` to get past an error. The `eslint-disable` headers in `stylelint.js` and `postcss.js` and the `no-console` suppression in `vue/Test.vue` predate this rule. The two headers exist because the base config declares browser globals only; the fix is a block that declares Node globals for those files, not another header.

## 9. Anti-slop

Delete these on sight, in your own output and in review:

- Dead entries: a rule the plugin no longer has, a rule set to its preset's value, a preset included twice.
- Commented-out rules and commented-out plugins. Remove a setting in full.
- Separator comments made of punctuation, and comments that restate the next line.
- An option, a flag, or a layer for a use case that does not exist.
- A plugin copied in beside a preset that already runs it.

## 10. Before you open the PR

1. Blank-line grouping applied to every file you touched.
2. Every new or changed entry carries a comment that says why, and the rule name exists in the installed plugin.
3. No new suppression.
4. Every declaration still matches its module.
5. `pnpm exec eslint .` is clean, and the consumer check in `AGENTS.md` section 9 ran for every change a consumer can observe.
6. `npm pack --dry-run` ran if you added, moved, or removed a file.
