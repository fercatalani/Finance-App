# Finance App - Minimal API

This is a minimal Express API used as a backend demo for the finance-app frontend.

Features:

- Health check: `GET /health` -> { status: 'ok' }
- Transactions resource (in-memory):
  - `GET /transactions` -> list
  - `POST /transactions` -> create
  - `GET /transactions/:id` -> get one

Auth endpoints:

- `POST /auth/signin` -> expects `{ email, password }`, responds with JSON user and sets an HttpOnly `session` cookie on success.
- `POST /auth/signup` -> creates a mock user and may set the `session` cookie.
- `POST /auth/signout` -> clears the `session` cookie (signs out).
- `GET /auth/session` -> returns the current user session (JSON) when a valid `session` cookie is present, otherwise `401`/`null`.

Notes on cookies and behavior:

- This API uses HttpOnly cookies to simulate the production behavior the frontend expects. The `session` cookie is set/cleared by the server and is not readable from client JavaScript.
- Prefer using this local API during frontend development so cookie semantics (Set-Cookie, HttpOnly) are realistic; this replaces relying on a browser MSW worker for many scenarios.

Run locally:

```bash
cd apps/api
npm install
npm run dev
# API runs on http://localhost:4000 by default
```

Example requests

Create transaction:

POST /transactions
{
"description": "Salary",
"amount": 3000,
"type": "income"
}

Response 201:
{
"id": "V1StGXR8_Z5jdHi6B-myT",
"description": "Salary",
"amount": 3000,
"type": "income",
"createdAt": "2026-01-13T12:00:00.000Z"
}

Get list:
GET /transactions -> [] or list of items.

If you need to change the port, set `PORT` in your environment before running (the dev server reads `process.env.PORT` if present).
