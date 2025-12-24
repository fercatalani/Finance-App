## MSW & Auth

- This project uses MSW (Mock Service Worker) for local development only. MSW runs in the browser and intercepts client-side requests.
- Server-side code (Next.js server components, middleware, or server fetches) does not go through the browser worker. To make server-side code behave predictably during development we use a small dev fallback:
  - `getServerSession()` in `src/lib/get-server-session.ts` returns a mock user in `NODE_ENV=development` so server components do not depend on the browser worker.
  - The sign-in flow sets a non-HttpOnly dev cookie (`session=fake-session`) in the browser after a successful MSW sign-in so subsequent navigations include a cookie the middleware can check. This is a development-only convenience and not secure for production.
- When you replace MSW with a real backend, remove the dev cookie logic and ensure `getServerSession()` fetches the real `/api/auth/session` (it already does in non-dev mode).

Recommended local workflow:

1. Run `npm install` then `npm run dev`.
2. Sign in using the mocked credentials in MSW (see `src/mocks/handlers/auth.ts`).
3. When switching to a real backend, remove the dev-cookie code in `src/app/(public)/sign-in/page.tsx` and rely on real HttpOnly cookies from the server.
