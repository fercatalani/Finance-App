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

## Auth & Database — Quick Reference (updated Feb 20, 2026)

### Stack

- DB: PostgreSQL (Docker container) exposed on host port `5433`.
- ORM: Prisma, schema at `apps/api/prisma/schema.prisma`.
- API: Express app in `apps/api`, uses a shared Prisma client at `apps/api/store/prismaClient.js`.

### First-time / new machine setup

```bash
cd finance-app
docker compose up -d db              # sobe Postgres em localhost:5433

cd apps/api
npm install                          # instala deps da API (inclui Prisma)
cp .env.example .env                # garante DATABASE_URL com porta 5433
npx prisma generate                  # gera o Prisma Client
npx prisma migrate dev --name init_auth  # cria/aplica tabelas User/RefreshToken
```

### Fluxo diário de desenvolvimento

```bash
cd finance-app
docker compose up -d db   # se o container já existir, apenas inicia

cd apps/api
npm run dev               # sobe a API Express

cd finance-app
npm run dev               # sobe o app Next
```

### Quando o schema do banco muda (ex: adicionar/alterar campos em User)

1. Editar `apps/api/prisma/schema.prisma` (ex.: tornar `firstName` obrigatório, adicionar novos campos, novas tabelas de tokens, etc.).
2. Gerar nova migration + aplicar no Postgres:

```bash
cd apps/api
npx prisma migrate dev --name <descricao_da_mudanca>
npx prisma generate
```

Notas:

- **Não** é necessário rodar `npm install` toda vez que você mudar o schema; só quando adicionar/atualizar dependências no `package.json`.
- Sempre que o shape dos modelos mudar (novos campos, novas tabelas) e o código usar esses campos, rode `prisma migrate dev` e depois `prisma generate` para manter DB e client em sincronia.
