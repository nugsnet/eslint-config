# eslint-config Development Documentation

Map of the authoritative docs. Read the one that covers your area before you work in it.

Work in progress does not live here: an ExecPlan lives in `todo/<slug>/SPEC.md`, which is gitignored — see [`PLANS.md`](../PLANS.md) at the repository root.

**Naming convention:** `<area>/<subject>.md`, one word per file name, kebab-case, no type suffixes (`eslint.md`, not `eslint-guide.md` or `ESLINT.md`). Related docs share a folder. One doc owns one concern.

Every file in this folder ships in the published package today, because `package.json` has no `files` list — see `AGENTS.md` section 6.

## `conventions/`

| Doc | When to read |
| --- | --- |
| [`code.md`](conventions/code.md) | Before any change to a config file or a declaration — module formats, formatting, where a rule goes, how an entry is written and commented |
| [`commits.md`](conventions/commits.md) | Before a commit or a PR |

## `platform/`

| Doc | When to read |
| --- | --- |
| [`eslint.md`](platform/eslint.md) | Before you change `index.mjs`, `eslint.config.mjs`, `ts/`, or `vue/` — how the layers compose, which files each one reaches, and the known traps |
| [`stylelint.md`](platform/stylelint.md) | Before you change `stylelint.js` — the presets, the one rule it sets, and what consumers override on top |
| [`postcss.md`](platform/postcss.md) | Before you change `postcss.js` — the plugin order, the units it rewrites, and why the last plugin stays last |

## `operations/`

| Doc | When to read |
| --- | --- |
| [`environment.md`](operations/environment.md) | First-time local setup, and linting a consumer against this checkout |

## Outside this folder

| Where | What |
| --- | --- |
| [`AGENTS.md`](../AGENTS.md) | The operating contract. Section 4 covers the public surface, section 6 what ships, section 10 the versioning policy and the release process. `CLAUDE.md` is a symlink to it |
| [`PLANS.md`](../PLANS.md) | How to write an ExecPlan for a Feature-lane change |
| [`README.md`](../README.md) | What the package is |
| [`USAGE.md`](../USAGE.md) | The consumer's setup guide. It stays at the repository root because it ships in the package and `README.md` links to it there |
| [`.github/RELEASE_TEMPLATE.md`](../.github/RELEASE_TEMPLATE.md) | The release notes body and the release steps |

## Adding a document

1. **Check it does not already exist.** Extend the doc that owns the concern instead of opening a second one beside it.
2. **Pick the area.** `conventions/` for how we write things · `platform/` for what the configs do · `operations/` for how the package is set up, verified, and released. If none fits, propose the new area before you create the folder.
3. **Name it** by the convention above.
4. **Write the "when to read" line first.** If you cannot state in one clause when someone should open this document, it does not have a clear concern yet.
5. **Add its row to this file, and update `USAGE.md` when a consumer has to act, in the same PR.** A doc that is not indexed does not exist.
6. **Say what is true today**, and say plainly when something is not measured, not implemented, or not verified.
7. **Do not document a tool's own behaviour.** If a rule's meaning belongs to ESLint or to a plugin, link to its reference and document only what this package sets and why.
