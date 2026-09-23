---
name: bump-version
description: Bump the version of the published bundle (major, minor or patch) and create the release branch for it. Use when the user asks to bump the major/minor/patch version, or to start a new release.
---

# Bump Version

Bump the version of the published npm bundle and open the release branch for it.

The version lives in one place only: `bundles/angry-pixel/package.json`. The workspaces in `packages/` keep their own `1.0.0` and are never bumped.

## Rules

1. **Which part to bump** — take it from the user's request: `major` (`x+1.0.0`), `minor` (`x.y+1.0`), `patch` (`x.y.z+1`). If the request does not say, ask.
2. **Branch off `main`** — the release branch always starts from `main`, never from the current branch. Create it _before_ editing the version.
3. **Branch name** — `release/x.x.x`, with the **new** version. Example: bumping `2.3.7` to a patch gives `release/2.3.8`.
4. **Only the version field** — do not touch anything else in `package.json`, and do not update the `CHANGELOG.md` unless the user asks for it.
5. **Do not commit** — leave the change in the working tree. Commit only if the user asks (see the `commit-and-push` skill, message `chore: bump version to x.x.x`).

## Steps

1. Read the current version: `node -p "require('./bundles/angry-pixel/package.json').version"`.
2. Work out the new version from the part the user asked for.
3. Check the working tree is clean enough to switch branches: `git status --short`. If there are uncommitted changes, ask the user what to do with them before continuing.
4. Create the release branch from `main`:
   ```
   git fetch origin main
   git checkout -b release/<new version> origin/main
   ```
   If the fetch is not possible, branch from the local `main` instead (`git checkout -b release/<new version> main`) and say so. If the branch already exists, stop and tell the user.
5. Set the new version in `bundles/angry-pixel/package.json`, keeping the file's 4-space indentation.
6. Report the old version, the new version and the branch name to the user.

## Example

Bumping the patch version from `2.3.7`:

```
git fetch origin main
git checkout -b release/2.3.8 origin/main
# bundles/angry-pixel/package.json: "version": "2.3.8"
```
