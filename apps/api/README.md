<h1 align='center'>todos-api</h1>

## 🛠 Technologies

This project was developed with the following technologies:

Backend

- [Turborepo](https://turborepo.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [NodeJS](https://nodejs.org/)
- [Typescript](https://typescriptlang.org/)
- [Express](http://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com)

## 📱💻 Instructions

```bash
## 1. Clone repo
git clone https://github.com/guivictorr/todos.git

## 2. Change to project folder
cd todos

## 3. Install dependencies
yarn

## 4. Configure .env file with your database credentials

## 5. Run migrations
npx prisma migrate dev

## 6. Start the api
yarn dev # this command will run migrations and start the app
```

## 🐳 Docker

To run this application with docker, after configure `.env` file and before run `yarn dev` you need to run `docker-compose up -d` to create and start a container running a postgres image

## 🤔 How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`.

Once your pull request has been merged, you can delete your branch.
