# Contributing

This is the workflow for every change, even solo. It keeps `main` deployable and the history readable.

## 1. Start from an up-to-date main

```bash
git switch main
git pull --ff-only          # fails instead of creating a merge commit if main moved oddly
git switch -c feat/sites-search
```

Branch names: `feat/…`, `fix/…`, `chore/…`, `docs/…`, `refactor/…`, `test/…`.

## 2. Commit in small, named steps

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(sites): filter the sites table by status
fix(auth): read the session from sessionStorage
chore(deps): remove framer-motion
```

The first line is under 72 characters and says what changed. The body (optional) says why.

## 3. Check before you push

```bash
npm run check        # typecheck, lint, design lint, build
npm run test:e2e     # end-to-end, accessibility, design
git push -u origin feat/sites-search
```

## 4. Open a pull request

```bash
gh pr create --fill
```

Fill in the template, including before and after screenshots for anything visual. CI must be green before merging.

## 5. Keep the branch current

If `main` moved while you worked, rebase rather than merge so the branch stays a straight line:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease   # safe force: refuses if someone else pushed
```

## 6. Squash and merge

Use **Squash and merge** on GitHub, so `main` gets one commit per pull request, titled with the PR's Conventional Commit title. Then delete the branch:

```bash
git switch main && git pull --ff-only && git branch -d feat/sites-search
```

## Recommended repository settings

Settings → Branches → add a rule for `main`:

- Require a pull request before merging
- Require status checks to pass: **Typecheck, lint and build** and **End-to-end, accessibility and design tests**
- Require linear history
- Allow squash merging only (Settings → General → Pull Requests), and enable "Automatically delete head branches"
