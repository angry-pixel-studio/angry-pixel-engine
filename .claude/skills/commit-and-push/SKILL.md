---
name: commit-and-push
description: Commit staged/unstaged changes and push to the remote. Use when the user asks to commit, push, or "commit and push" their work. Enforces small conventional commit messages, the current branch, and no co-author attribution.
---

# Commit and Push

Follow these rules when committing and pushing.

## Rules

1. **Current branch** — always commit and push to the current branch, unless the user tells you otherwise. Do not create or switch branches on your own.
2. **No co-author** — never add yourself (Claude) as a co-author. Do not append any `Co-Authored-By` trailer or "Generated with Claude Code" line.
3. **Message format** — keep it small and use `<type>: brief description`, where `<type>` is one of `feat` / `fix` / `chore`. Example: `feat: player damage feedback`.

## Steps

1. Run `git status` and `git diff` to review what will be committed.
2. Stage the changes (`git add`).
3. Commit with a message in the required format. Pick the `<type>` that matches the change:
   - `feat` — a new feature or capability.
   - `fix` — a bug fix.
   - `chore` — tooling, config, refactors, or maintenance that isn't a feature or fix.
4. Push to the current branch: `git push`.

## Example

```
git add .
git commit -m "fix: local storage initialization"
git push
```
