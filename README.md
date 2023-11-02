# Overview

This repo contains an example on how Express, TypeORM, and Postgres can be utilized together. In tandem with https://github.com/dbarkowsky/ExpressPrismaPostgres for comparing Prisma and TypeORM.

## Setup

Fill out both .env files with necessary information. 
- ./.env
- ./api/.env

## Running Database

1. From the root folder, run docker-compose up postgres to start the database.
    - Postgres ENVs must be set before this. See above.
2. Check Docker Desktop or use docker ps to see that Postgres is running properly.

## Run API

1. From the api/ folder run:
    ``` npm run dev ```
    - this will create tables in the database and must be done before seeding the database

## Seed Database

1. From api/ folder run:
    ``` npm run migration ```
2. If you would like to undo the seeding process run:
    ``` npm run rollback ```

