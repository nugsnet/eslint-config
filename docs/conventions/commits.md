# Commits and Pull Requests

Rules for writing commits in this repository. Mandatory for every commit — a requirement, not a stylistic preference. The existing history predates them (`Fix PostCSS source loss…`, `Update dependencies`); it is not precedent. Nothing enforces them mechanically — there is no commitlint and no `commit-msg` hook — so this document is the only contract.

Committing and pushing both need the developer's explicit approval in the current conversation (`AGENTS.md` section 1). Run the gates before you propose either.

The format is [Conventional Commits](https://www.conventionalcommits.org/).

## 1. Message structure

```txt
<type>(<scope>): <subject>

<body>

<footer>
```

- `type` — required.
- `scope` — optional, in parentheses, lowercase.
- `subject` — required, a short one-line description.
- `body` — optional, explains **what** and **why**, not **how**.
- `footer` — optional: ticket links and `BREAKING CHANGE:`.

## 2. Type

Pick the type by the nature of the change. Don't label everything `feat`.

| Type | When to use |
| --- | --- |
| `feat` | A new rule, plugin, preset, or entry a consumer receives |
| `fix` | A config that fails to load, a rule that misfires, a declaration that disagrees with its module |
| `docs` | Documentation only (`docs/**`, `*.md`) |
| `style` | Formatting, indentation, whitespace — no behaviour change |
| `refactor` | A config change that leaves every consumer's resolved config unchanged |
| `perf` | A change that makes linting or a consumer build faster |
| `build` | Dependencies and the package manifest (`package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`), including a version bump |
| `ci` | Pipeline configuration (`.github/workflows/**`, `.github/dependabot.yml`) |
| `chore` | Routine work that touches no published config — templates, editor settings |
| `revert` | Revert of a previous commit |

Selection rule: a rule that is relaxed or removed because it misfires is `fix`. A rule that is tightened or added is `feat`, and it is a behaviour change for every consumer — say so in the body. A `refactor` claim needs proof: `--print-config` output that is the same before and after.

## 3. Scope

Name the part of the package the change lands in: `eslint`, `ts`, `vue`, `stylelint`, `postcss`, `types`, `deps`, `docs`.

## 4. Subject

- Imperative mood, present tense: `add`, `fix`, `update` — **not** `added`, `fixes`, `updated`.
- Lowercase, no trailing period.
- At most 72 characters.
- Describes the outcome, not the process.

**BAD**:

```txt
Fix PostCSS source loss and redundant config entries
Update dependencies
fix: rules
feat: bump plugins and change indent and fix the types
```

**GOOD**:

```txt
fix(postcss): restore the source of nodes that postcss-scrollbar creates
fix(stylelint): drop the undeclared stylelint-config-standard preset
feat(vue): report unused template refs
build(deps): bump typescript-eslint to 8.68.0
build: bump version to 1.9.7
```

## 5. Body

- Separated from the subject by one blank line, wrapped at 72 characters.
- Explains the motivation: the symptom a consumer saw, what changes in each consumer, and the alternatives.
- For a rule change, give the consumer counts from the check in `AGENTS.md` section 9.
- Needed only when the subject is not enough. A trivial change needs no body.

```txt
fix(stylelint): drop the undeclared stylelint-config-standard preset

stylelint.js extended stylelint-config-standard without declaring it, so
pnpm could not resolve it and every consumer failed with "Could not find
stylelint-config-standard". stylelint-config-standard-scss already
extends it, so the entry was redundant.
```

**The message ends at the body.** Do not add a `Co-authored-by` trailer, a "Generated with …" line, or any other tool attribution. The history carries such trailers; they are not precedent.

## 6. Footer

- Ticket references: the Jira key, as `PLAT-1234`, or `Closes #123` for a GitHub issue.
- Breaking changes: a `BREAKING CHANGE: <description>` line, or a `!` after the type — `feat!:`.

```txt
feat(eslint)!: require eslint 10

BREAKING CHANGE: the peer range is now eslint >=10. A consumer on
eslint 9 has to upgrade before it takes this release.
```

Renaming or moving a published file is a breaking change here even when no rule changes, because the package has no `exports` map and consumers import the paths directly. Mark it.

## 7. Atomicity

- One commit holds one logical change. Don't mix a rule change, a dependency bump, and a documentation fix.
- A version bump is its own commit, `build: bump version to X.Y.Z`. The history bundles bumps into change commits; that predates this rule.
- Every commit leaves the repository in a working state: the configs load and `pnpm exec eslint .` is clean.

## 8. Before committing

- `pnpm exec eslint .` is clean.
- The consumer check ran for every change a consumer can observe, and the counts are in the body.
- `npm pack --dry-run` ran if a file was added, moved, or removed.
- A changed export shape has its `.d.ts` updated in the same commit.

## 9. Pull requests

Recent work lands directly on `main`; Dependabot is the only recent source of pull requests. Larger work goes through a PR.

[`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md) is the contract. A PR title starts with `Feature:`, `Hotfix:`, or `Release:`; the prefix is the title only. Label the PR — [`.github/release.yml`](../../.github/release.yml) groups generated release notes by label.

The description carries a summary, the linked ticket, every breaking change, every rule change with its consumer counts, what ships, and the validation commands with their output. The attribution ban in section 5 applies to it.

See `AGENTS.md` section 10 for versioning and the release process, and [`code.md`](code.md) for the shape of the code.
