---
name: open-pr
description: Open a pull request for the current branch, and keep its description up to date. Use when the user asks to open/create a PR, or after pushing work that belongs in one. Enforces the release/feature title patterns and no author attribution.
---

# Open PR

Follow these rules when opening a pull request.

## Rules

1. **Title format** — it depends on the kind of work:
    - **Release** — the title is the branch name: `release/x.x.x`. Example: `release/2.3.5`.
    - **Feature, bugfix or chore** — `<type>: description`, where `<type>` is one of `feat` / `fix` / `chore`. Example: `feat: tiled object entities`.
2. **No author attribution** — never add yourself (Claude) as author or co-author of the pull request. Do not append a `Co-Authored-By` trailer, a "Generated with Claude Code" line, or any other authorship note to the title or the body.
3. **Base branch** — open the PR against `main`, unless the user tells you otherwise.
4. **Keep the description up to date** — when new commits are pushed to a branch that already has an open PR, update the PR description so it covers them.

## Body style

Write the body in the same style as the previous PRs of the repository: short sections with bold lead-ins that state what changed, grouped by area. Cover breaking changes in their own section. Be concise and factual, with no filler.

```markdown
## Area

**What changed** — one or two sentences describing it.

### Breaking changes

-   The removed or renamed API.
```

## Steps

1. Check the branch and what it contains: `git log main..HEAD --oneline`.
2. Push the branch if it has no upstream yet: `git push -u origin <branch>`.
3. Create the PR with the title pattern that matches the work:
   `gh pr create --base main --title "<title>" --body-file <file>`.
4. Give the user the URL of the pull request.

To update the description of an existing PR: `gh pr edit <number> --body-file <file>`.
