This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication & Development

This project uses a Node.js/Express backend under `apps/api` with:

- PostgreSQL + Prisma for user and token storage.
- Argon2 password hashing.
- Session tokens stored in a `RefreshToken` table and delivered via HttpOnly cookies (`session`).

In development:

- The backend runs on `http://localhost:4000`.
- The Next.js app proxies `/api/*` requests to the Express API.
- Server components obtain the current user via `getServerSession`, which reads the `session` cookie and calls the Express `/auth/session` endpoint.
