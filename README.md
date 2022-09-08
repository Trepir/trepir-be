[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Trepir

## Where to?

Trepir allows users to create and edit trip itineraries with thousands of modular, user-generated activities around the world

## Developed with...

<p align="left">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" /></a>
<a href="https://docs.nestjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nestjs-colored.svg" width="36" height="36" alt="NestJS" /></a>
<a href="https://www.postgresql.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="36" height="36" alt="PostgreSQL" /></a>
<a href="https://www.heroku.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/heroku-colored.svg" width="36" height="36" alt="Heroku" /></a>
</p>

## Getting started

1. Clone the repo

```
git clone https://github.com/Trepir/trepir-be.git
cd trepir-be
```

2. Install dependencies (Make sure to have already have installed PostgreSQL on your computer)

```
npm install
```

3. Create your .env file and fill it with your credentials

```
/* You will need DATABASE_URL and PORT */
```

4. Start development backend server

```
npx prisma migrate dev
npm run start:dev
```

## What makes Trepir Different

- ### Shared Content
  - Users can create activities for other users to add to their trips.
- ### Modify Your Trips
  - Easy drag and drop UI for ease of use
  - Dates modify automatically for the user when an accommodation or travel is moved to a new day.

### See live on <a href="https://www.trepir.com/" target="_blank" rel="noreferrer">trepir.com</a>
