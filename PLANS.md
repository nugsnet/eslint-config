# Execution Plans (ExecPlans)

An ExecPlan is a design document a coding agent follows to deliver a working change. Write for a reader who has only the current working tree and this one file: no memory of prior plans, no external context.

`AGENTS.md` is the operating contract and wins on any conflict with this file — present the disagreement with evidence and let the developer rule, never resolve it silently. This file governs the shape and upkeep of a plan and nothing else.

An ExecPlan belongs to the Feature lane in `AGENTS.md` section 1: any rule, severity, option, plugin, parser, preset, or ignore in a published entry, any change to `postcss.js`, a bump in `dependencies` or `peerDependencies`, or a new, moved, or renamed file. A Trivial or Small request gets the intent block and no plan.

It lives at `todo/<slug>/SPEC.md`. `todo/` is gitignored, so a plan is never committed and never takes a row in the documents index. A document that must survive as a shared specification is not a plan — it belongs in `docs/**`.

**This repository publishes a package, and every consumer adopts it automatically.** Consumers depend on caret ranges, so a release reaches each of them on its next lockfile refresh. A plan here is not finished when the config loads; it is finished when every consumer lints and builds cleanly on it, or when the developer has accepted the new findings in each one. Say which release carries the change and what each consumer sees.

## How to use ExecPlans and PLANS.md

**Authoring.** Follow this file _to the letter_; re-read it if it is not in your context. Start from the skeleton at the end and flesh it out as you research the source material.

**Implementing.** Proceed to the next milestone without asking "what next" — the plan already answers that. Keep every section current, splitting entries at each stopping point. Resolve an ambiguity yourself when the plan or the repository already holds the answer; when the requirement, the intent, or the architecture is unclear, ask before writing a line of code (`AGENTS.md` section 2). Every commit and push needs the developer's approval in the current conversation, so a milestone ends with a commit proposal, never a commit. A version bump, a publish, and a GitHub Release each need their own approval at the moment the step runs.

**Discussing.** Record every decision in the plan's `Decision Log`. It must always be possible to restart from _only_ the plan.

**Researching.** When requirements are hard or unknowns are large, use milestones for proofs of concept. Read the installed source of the tool involved — `node_modules/eslint`, `node_modules/typescript-eslint`, `node_modules/eslint-plugin-vue`, the Stylelint presets, the PostCSS plugins — or its current reference. A plugin adds, renames, and removes rules between versions, and memory is not evidence. Read the consumers too: the sibling checkouts under `../` show what each one adds on top of this package.

## Requirements

NON-NEGOTIABLE:

* Fully self-contained: in its current form the plan holds everything a novice needs to succeed.
* A living document: revised as progress is made and decisions are finalized, and self-contained after every revision.
* Enables a complete novice to implement the change end to end with no prior knowledge of this repository.
* Produces demonstrably working behaviour, not configuration that merely "meets a definition".
* Defines every term of art in plain language, or does not use it.
* Opens with the header block below — `Status`, `Owner`, `Started`, `Context` — and keeps `Status` true as the work moves.

Purpose comes first: open by saying what a consumer gets after this change that it did not get before, and how to see it working. Then give the steps to get there.

The executing agent can list files, read, search, run the linters here and in the sibling consumer checkouts, and run `npm pack --dry-run`. It cannot infer what you meant, so repeat every assumption you rely on. Never send the reader to a blog or a vendor page for knowledge the plan needs — embed it in your own words and name the source beside it, a repository-relative path or the URL you actually read. The citation is evidence next to the knowledge, never a replacement for it. If the plan builds on an earlier plan, reference it by full path when that file exists and inline its relevant context when it does not.

## The header block

Every plan opens with this header, directly under the title. Nothing precedes it.

    # <Title of the feature or the change>

    Status: draft
    Owner: <name or email of the person accountable for the work>
    Started: 2026-09-22
    Context:
      - PLAT-3181 — <what the ticket asks for>
      - <the developer's own framing, in their words where you have it>
      - <constraints, concerns, requirements, and anything already ruled out>
      - <which consumer asked for this, and which consumers will see new findings>

`Status` is one of `draft` · `in progress` · `blocked` · `complete` · `abandoned`. Move it to `in progress` when work starts, to `blocked` the moment you are waiting on someone with the reason in the `Decision Log`, and to `complete` only once `Outcomes & Retrospective` is written. A status that contradicts `Progress` is a defect; update both at the same stopping point.

`Owner` is the person accountable for the work, not the agent that typed it.

`Started` is an absolute `YYYY-MM-DD` date. Never "today" or "last week" — a plan is read months later by someone who was not there.

`Context` carries what the work depends on but does not define: the ticket and other links, the developer's reasoning and intent, the constraints and concerns raised in conversation, and the requirements stated out loud that exist nowhere in the tracker. For this repository it also carries the consumer story — who needs the change, and who pays for it in new findings. A bare link is not context: say in one clause what is behind it.

## Formatting

A plan is one fenced code block labeled `md`. Never nest another triple-backtick fence inside it — show commands, transcripts, diffs, and code as indented blocks, so the outer fence cannot close early. Two newlines after every heading; correct list syntax. When the file contains only the plan, omit the outer fence.

Write plain prose and prefer sentences to lists. Checklists are mandatory in `Progress` and forbidden elsewhere unless brevity would obscure meaning.

## Guidelines

**Define your terms.** If a phrase is not ordinary English — "flat config", "layer", "preset", "the later entry wins", "consumer check" — define it where you use it and name where it appears in this repository. Never write "as defined previously" or "see the ESLint doc" in place of the explanation; repeat yourself and cite the file you drew it from, such as `AGENTS.md` section 7 or `docs/platform/eslint.md`.

**Name the public surface.** State explicitly whether the change adds, alters, or removes a rule, a severity, an option, a plugin, a preset, an ignore, a peer range, or a file path. Every file path is public here, because the package declares no `exports` map and no `files` list — `AGENTS.md` section 4. Say which new files will ship; `npm pack --dry-run` shows it. "Nothing" is a valid and useful answer.

**Count what the consumers see.** For every change a consumer can observe, run the consumer check from `AGENTS.md` section 9 in each consumer, before and after the change, and record the difference per consumer. A rule change with no counts is a rule change nobody measured.

**Do not hollow out the feature.** Do not describe it so narrowly that the config loads and does nothing meaningful, and do not leave a decision to the reader — resolve the ambiguity in the plan and say why. Over-explain observable effects; under-specify incidental detail.

**Anchor on observable outcomes.** Phrase acceptance as behaviour a human can verify — "after the change, `pnpm exec eslint --config ../eslint-config/index.mjs src` in `../web-sdk` reports the same findings as before, and `../get.nugs.net` reports 12 new `vue/no-unused-refs` errors, all in `src/app/components/`" — not as internal attributes ("added a rule to the Vue layer"). A config's most honest outcome is in the consumer: say what each one gains, what it must fix, and what it no longer has to override.

**Be concrete about this repository.** Full repository-relative paths, exact rule and plugin names, and the layer each change lands in. Give the working directory with every command — the consumer check runs in the consumer's directory. When the outcome depends on a file type — `.ts`, `.vue`, `.mjs`, `.scss` — say which ones the change reaches.

**Be idempotent and safe.** Steps run more than once without damage or drift, and a step that can fail halfway says how to retry. Prefer additive, verifiable changes. The consumer check never runs with `--fix` and never edits a consumer. Some operations need the developer's approval at the moment the step runs, and the plan states that approval point rather than assuming it: every commit and push, a dependency version change, a version bump, a publish or GitHub Release, a `link:` install into a consumer, and deleting or overwriting a file the plan did not create.

**Validate.** Give the commands from `AGENTS.md` sections 8 and 9 and how to read them, with the expected output, so a novice can tell success from failure:

    pnpm exec eslint .                                                   # this repository, exit 0 and no output
    pnpm exec eslint --print-config <file>                               # the final value of one rule for one file
    npm pack --dry-run                                                   # what ships, when a file was added or moved
    pnpm exec eslint --config ../eslint-config/index.mjs <paths>         # in a consumer, before and after the change

A milestone is not accepted until those checks are green or the new findings are recorded and accepted. There is no test suite; never report tests as passing.

**Capture evidence.** Include the transcripts, short diffs, and finding counts that prove success, as indented examples. Prefer a file-scoped excerpt a reader can recreate over a pasted blob.

## Milestones

Milestones are narrative, not bureaucracy. Introduce each with a paragraph: the scope, what will exist at the end that did not exist before, the commands, and the acceptance you expect. Goal, work, result, proof. Never abbreviate one for brevity or drop a detail a future implementation would need.

Milestones and `Progress` are distinct — milestones tell the story, progress tracks granular work — and both must exist. Each milestone is independently verifiable, advances the overall goal, and is a shippable unit as `AGENTS.md` section 2 requires: the gates are green and the package stays publishable at that point.

**A milestone that changes what a consumer sees is not adopted when it is merged.** Adoption costs a release here and a lockfile refresh in every consumer, and the release needs the developer's approval. Make that its own final milestone rather than a sentence at the end of another: the release goes out, and the plan records what each consumer reports on it.

## Living plans and design decisions

* A plan must contain and maintain `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective`. These are not optional.
* Record every design decision in the `Decision Log` in the three-part form `AGENTS.md` section 4 requires: the decision, the alternatives rejected, the reason.
* Capture a surprising preset default, a rule the plugin renamed or removed, a resolution failure under pnpm, or a consumer override that changed the picture in `Surprises & Discoveries`, with short evidence. Linter output is ideal.
* If you change course mid-implementation, say why in the `Decision Log` and reflect it in `Progress`.
* At the end of a major task or of the plan, write an `Outcomes & Retrospective` entry: what was achieved, what remains, what was learned.

## Prototyping and parallel implementations

A prototyping milestone that de-risks a larger change is encouraged — a rule tried at `warn` against every consumer to count its findings, or two plugin options compared on the same consumer. Label the scope as prototyping, say how to run and observe it, and state the criteria for promoting or discarding it. A prototype lives under `todo/` or on a spike branch, never in the shipped diff, because the anti-slop rules in `AGENTS.md` section 5 forbid a dead entry in a published config. The milestone that discards one removes it in full.

`AGENTS.md` section 4 forbids two parallel approaches to one problem and section 2 forbids an unrequested fallback, so a parallel implementation — a new entry path kept beside an older one during a migration — enters a plan only with the developer's approval, recorded in the `Decision Log` and noted in the PR. It costs more here than in an application: both paths ship, and a consumer can adopt either. When approved, describe how to validate both, and name the milestone that retires one and the release that carries the removal. A plan still holding two paths at completion is rejected.

### Skeleton of a good ExecPlan

    # <Short, action-oriented description>

    Status: draft
    Owner: <name or email>
    Started: <YYYY-MM-DD>
    Context:
      - <ticket link — what it asks for>
      - <the developer's framing, requirements, and concerns>
      - <the consumer that needs this, and the consumers that will see new findings>

    This ExecPlan is a living document. `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` are kept up to date as the work proceeds. It is maintained in accordance with `PLANS.md`, and the work follows `AGENTS.md`, which wins on any conflict.

    ## Purpose / Big Picture

    What a consumer gets after this change and how to see it working, in the consumer as well as in this repository.

    ## Public Surface

    What this change adds, alters, or removes: rules, severities, options, plugins, presets, ignores, peer ranges, and file paths. Which new files ship. What each consumer has to do about it. "Nothing" is a valid answer.

    ## Progress

    Granular steps as a checkbox list, always reflecting the actual current state. Every stopping point is recorded here, splitting a partially completed task into "done" and "remaining" where needed. Timestamps measure the rate of progress.

    - [x] (2026-09-22 13:00Z) Example completed step.
    - [ ] Example incomplete step.
    - [ ] Example partially completed step (completed: X; remaining: Y).

    ## Surprises & Discoveries

    Unexpected behaviour, bugs, or insights found during implementation, with concise evidence.

    - Observation: …
      Evidence: …

    ## Decision Log

    - Decision: …
      Rejected alternatives: …
      Rationale: …
      Date/Author: …

    ## Outcomes & Retrospective

    Outcomes, gaps, and lessons at major milestones and at completion, compared against the original purpose.

    ## Context and Orientation

    The current state relevant to this task, as if the reader knows nothing. Key files by full path. Every non-obvious term defined. No reference to prior plans.

    ## Plan of Work

    In prose: the sequence of edits and additions, each naming the file and the layer — base block, TypeScript layer, Vue layer, ignore list, Stylelint config, PostCSS plugin list — and what changes there. Concrete and minimal.

    ## Concrete Steps

    The exact commands and where to run them, with a short expected transcript for each that produces output. Updated as the work proceeds.

    ## Validation and Acceptance

    How to exercise the change and what to observe, phrased as behaviour with specific inputs and outputs: `pnpm exec eslint .` here, `--print-config` for the rule you changed, and the consumer check in every consumer with the finding counts before and after. A bug fix states its reproduction first — the failing consumer run or the wrong resolved config (`AGENTS.md` section 9). A PostCSS change says plainly that no consumer check exists for it, unless the developer approved a `link:` install.

    ## Release and Adoption

    Which release carries this change, which version number the policy in `AGENTS.md` section 10 gives it and why, what its notes say, and what each consumer reports once it refreshes its lockfile. Omit only when nothing published changes, and say so.

    ## Idempotence and Recovery

    Which steps repeat safely, and the retry or rollback path for the risky ones. Every consumer is left exactly as it was.

    ## Artifacts and Notes

    The transcripts, diffs, and finding counts that prove success, as indented examples.

    ## Interfaces and Dependencies

    Prescriptive: the presets, plugins, and rule names to use and why, and the entries that must exist at the end of the milestone. Name an entry the way a consumer writes it, such as `@nugsnet/eslint-config/stylelint`. E.g.:

    In `vue/index.mjs`, in the `**/*.vue` block, set:

        // An unused template ref is dead state that still costs a reactive binding.
        'vue/no-unused-refs': 'error'

The bar is: SELF-CONTAINED, SELF-SUFFICIENT, NOVICE-GUIDING, OUTCOME-FOCUSED. When you revise a plan, carry the change through every section including the living ones, and note at the bottom what changed and why. A plan describes not just the what but the why.
