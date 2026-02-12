## Development Notes — Mocking & Auth (updated Feb 12, 2026)

Summary:

- Local development should use the Express dev API at `apps/api` for mocked endpoints that need realistic server behavior (HttpOnly cookies, headers).
- MSW remains available for tests (Jest) — test suites register handlers via test setup.

Run tests:

```bash
npm ci
npm test
```

Jest specifics:

- Tests use a test-specific TS config at `tsconfig.jest.json` and `jest.setup.ts` for DOM matchers.
- If you change test mocking behavior, update `jest.setup.ts` and `jest.config.cjs` accordingly.

AuthProvider:

- `src/app/AuthProvider.tsx` was converted to a non-starting wrapper: it will no longer import or start mocks. If you need a client-side gate, implement a small `ClientAuthGate` component that only runs in client bundles.
