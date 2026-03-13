This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started - Frontend

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

Open [http://localhost:3000] with your browser to see the result.

## Backend & Docker

The API backend is a Node.js/Express app in `apps/api` and uses PostgreSQL in Docker.

Start the database container (from the project root):

```bash
docker compose up -d db
```

Start the Express API (in another terminal):

```bash
cd apps/api
npm install       # primeira vez na máquina
npm run dev
```

The API will run on `http://localhost:4000` and the Next.js app on `http://localhost:3000`, with `/api/*` proxied to the Express server in development.

Key routes in the App Router:

- Public auth:
  - `/log-in` – log in to an existing account
  - `/sign-up` – create a new account
  - `/forgot-password` – start the password reset flow
- Private app:
  - `/dashboard` – main overview after authentication
  - `/finances` – detailed income/expense view

## Authentication & Development

This project uses a Node.js/Express backend under `apps/api` with:

- PostgreSQL + Prisma for user and token storage.
- Argon2 password hashing.
- Session tokens stored in a `RefreshToken` table and delivered via HttpOnly cookies (`session`).

In development:

- The backend runs on `http://localhost:4000`.
- The Next.js app proxies `/api/*` requests to the Express API.
- Server components obtain the current user via `getServerSession`, which reads the `session` cookie and calls the Express `/auth/session` endpoint.
