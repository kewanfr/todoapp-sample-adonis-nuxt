# backennd-todo

## Project overview

This is the backend of a simple todo list app I wanted to create to learn to use AdonisJS. It is a REST API that allows users to create, read, update and delete tasks. It also allows users to create an account and login to the app.

## Technologies used

- AdonisJS
- PostgreSQL
- Lucid ORM

## How to run the project

Requirements:
- NodeJS
- PostgreSQL

1. First, you must have a postgreSQL database running on your machine. You can download it [here](https://www.postgresql.org/download/).
2. Clone this repository.
3. Run `npm install` to install the dependencies.
4. Create a `.env` file in the root directory of the project and copy the contents of the `.env.example` file into it.
5. Fill in the `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_DATABASE` variables with the information of your database.
6. Run `node ace migration:run` to run the migrations and create the tables in the database.
7. Run `node ace serve --watch` to start the server.
8. You can now make requests to the server at `http://localhost:3333`.