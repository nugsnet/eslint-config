<!-- Title this pull request with one of three prefixes:

       Feature: <what it adds>
       Hotfix:  <what it repairs>
       Release: <version, e.g. v1.9.7>

     The prefix is the title only. Commit messages keep Conventional Commits. -->

# Pull Request

## Summary

<!-- What changed here, and which symptom it fixes. -->

## Source

<!-- PLAT-0000, or "none" with a reason. Look it up in Jira or Confluence:
     https://nugsnet.atlassian.net/jira
     https://nugsnet.atlassian.net/wiki/home -->

## Breaking changes

<!-- Every one, or "none". A new peer requirement, a rule that turns clean code into
     errors, and a moved or renamed file are all breaking here. Every consumer takes a
     1.x release on its next lockfile refresh — a minor bump does not stop it. -->

## Rule changes

<!-- Every rule, severity, option, plugin, preset, parser, or ignore that a consumer
     receives differently — or "none". For each one, the consumer check from AGENTS.md
     section 9, before and after, with the finding count per consumer. A PostCSS change
     says plainly that no consumer check exists for it. -->

## Changes

<!-- One bullet per change, in the imperative: "add", "drop", "restore".
     Say what a consumer gains or must change, not how the config works. -->

- `change`

## What ships

<!-- Files added, moved, or removed in the published package, or "none".
     Paste the file list from `npm pack --dry-run` when it changed. -->

## Security

- <list of security changes, if any>

## Verification

<!-- Paste the output. A claim without output is not validation. There is no test
     suite — never write that tests pass. Run:
       pnpm exec eslint .                                            in this repository
       pnpm exec eslint --print-config <file>                        for a changed rule
       pnpm exec eslint --config ../eslint-config/index.mjs <paths>  in each consumer
       npm pack --dry-run                                            when a file changed -->

- `<commands and output>`

## Migration Notes

- <what a consumer has to change, and in which order>

## Consumers affected

<!-- `web-player`, `web-sdk`, `ssr-kit`, `get.nugs.net`, `account.nugs.net`,
     `redeem.nugs.net`, `playdead-landing`, `websdk-widgets`, `chromecast-receiver` —
     or "none". Name what each of them has to do, if anything. -->

## Linked Issues

<!-- Close or reference what this fixes: `Closes #123`, `Refs #456`, `PLAT-123`.
     Write "none" when there is nothing to link. -->

## Checklist

- [ ] Title starts with `Feature:`, `Hotfix:` or `Release:`.
- [ ] Commits follow Conventional Commits. No `Co-authored-by` trailer and no tool attribution.
- [ ] One logical change. The configs load at every commit.
- [ ] Every new or changed entry carries a comment that says why.
- [ ] Every rule name exists in the installed plugin, and every preset is a declared dependency.
- [ ] No new `eslint-disable`, `@ts-ignore`, or `any`.
- [ ] Every `.d.ts` still matches its module.
- [ ] The consumer check ran for every change a consumer can observe.
- [ ] `USAGE.md` and the documents in `docs/` match the new behaviour.
