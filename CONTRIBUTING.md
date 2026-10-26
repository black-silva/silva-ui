# Contributing to silva-ui

Thank you for helping improve silva-ui. Contributions are welcome through
GitHub issues and pull requests.

## Before you start

- Search existing issues and pull requests before opening a new one.
- For a bug, include reproducible steps, expected behavior, actual behavior,
  and the affected browser or environment.
- For a feature, describe the use case and proposed public API before doing
  substantial implementation work.
- Keep changes focused. Avoid unrelated formatting or refactoring in the same
  pull request.

## Development setup

```bash
git clone https://github.com/black-silva/silva-ui.git
cd silva-ui
npm install
npm run dev
```

The documentation app is in `example/` and imports the library directly from
`src/`.

## Making changes

1. Create a branch from the default branch.
2. Make the smallest complete change that addresses the issue.
3. Update the example app or README when the public behavior or API changes.
4. Add or update tests when the repository has coverage for the affected area.
5. Keep public types and accessibility behavior in sync with implementation.

## Validation

Run the checks that apply to your change:

```bash
npm run typecheck
npm run build
git diff --check
```

For package-related changes, also run:

```bash
npm run pack:check
```

Do not commit generated output, including `dist/`, `example/dist/`,
`.vanilla-extract/`, `node_modules/`, or `vite-profile-*.cpuprofile`.

## Pull requests

Pull requests should:

- Explain the problem and the solution.
- Identify any public API or behavior changes.
- Include screenshots or a short recording for visual changes when useful.
- Include the validation commands that were run.
- Keep the title concise and action-oriented.

Maintainers may request changes before merging. Please respond to review
feedback constructively and keep follow-up commits focused.

## License

By contributing to silva-ui, you agree that your contributions are licensed
under the repository's [MIT License](./LICENSE).
