# Instructions

## 1. Set Configuration

Create two `.env` files. One in the root, another in `/api` for Prisma.

- The root `.env` should contain every key listed in `.env-template`
- The `.env` in the `/api` folder needs the Postgres keys and one key that matches this format:
  - `DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_SERVICE}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"`

## 2. Start Database

1. Run `docker-compose up postgres` to start the database.
   - Postgres ENVs must be set before this. See above.
2. Check Docker Desktop or use `docker ps` to see that Postgres is running properly.

## 3. Run Prisma Commands

1. Apply migrations with `npm run migrate`.
2. Seed the database with `npm run seed`.

## 4. Start API

1. Run `npm run dev` to start the API for local development.
   - It should respond with `Server started on port ...`

OR

1. Run `docker-compose up api`.
   - This will start a Docker container for the API. It will automatically apply the schemas from Prisma to the database.
