# Release notes template

Copy the body below into `gh release create`. The title is always `nugs Eslint Config`.

```sh
gh release create vX.Y.Z --title "nugs Eslint Config" --notes-file notes.md
```

Creating the release starts `.github/workflows/release-package.yml`, which installs
with `pnpm i --frozen-lockfile` and publishes to GitHub Packages with
`pnpm publish --no-git-checks`. It publishes the version in `package.json`; the tag
does not set it. Every consumer on a `^1.x` range takes the release on its next
lockfile refresh.

The version follows the policy in `AGENTS.md` section 10. It is not strict semver:

| Part | Use it for |
| --- | --- |
| **X** major | A change that shifts how the whole configuration works |
| **Y** minor | Something a consumer has to react to — a new peer requirement, a rule that turns clean code into errors, a removed or renamed entry path |
| **Z** patch | Everything else — fixes, a relaxed rule, dependency bumps that add no findings |

---

## Body

```markdown
## Breaking changes

- <what broke, and the one change a consumer makes>

## Rule changes

- <the rule, the old and the new value, and the finding count per consumer>

## Fixes

- **<the symptom, in bold.>** <the cause, and what changed>

## Cleanup

- <a removed entry, a duplicate dropped, a declaration corrected>

## Security

- <the advisory, the package, and the version it moved to>

## Dependencies

<package> <old> → <new>, plus minor bumps of <packages>

## Verification

- `<commands and output>`

## Migration Notes

- <what a consumer has to change, and in which order>

## Linked Issues

- <`Closes #123`, `Refs #456`, `PLAT-123`>


**Full Changelog**: https://github.com/nugsnet/eslint-config/compare/vA.B.C...vX.Y.Z
```

`## Linked Issues` takes what the release closes. Look a ticket up in Jira or Confluence:
<https://nugsnet.atlassian.net/jira> and <https://nugsnet.atlassian.net/wiki/home>.

Drop any section that is empty. Keep **Breaking changes** first and **Rule changes**
second when they are present — they are the sections a consumer reads before a lockfile
refresh. The v1.9.5 and v1.9.6 notes are worked examples of **Fixes**, **Cleanup**,
**Security**, and **Dependencies**.

---

## Before you release

1. Bump `version` in `package.json`.
2. Run `pnpm exec eslint .`. Clean.
3. Run the consumer check (`AGENTS.md` section 9) when a published entry changed.
4. Commit `build: bump version to X.Y.Z`.
5. Push `main`.
6. Create the release. The workflow publishes it.

Each step needs the developer's approval at the moment it runs.

## Rules for the text

- Write in English, whatever language the discussion used.
- No tool attribution and no `Co-authored-by` trailer.
- One idea per bullet. Say what a consumer gains or must change, not how the config works.
- Name every rule change and every breaking change. A consumer's lint runs on what ships here.
