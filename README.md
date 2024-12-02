# Freelancer's Gear Scheduler Solo Project

The Freelancer’s Gear Scheduler is an app designed for freelancing professionals to manage their stock of equipment and all the events for which they’ll use it. Oftentimes once freelancers get to a point where they’re juggling multiple events in a short timeframe it becomes a hassle to keep track of equipment and event management from memory or written notes, so this app aims to streamline that tracking and organization. Users can add pieces of gear to their equipment list with relevant details, creating a virtual database representation of their available gear. Users can also add events to their events list with details they want to know about how to work each event. Pieces of equipment can be assigned to events all independently, allowing users to easily keep track of what gear is reserved for which events when many pieces of gear are going out to various events simultaneously.

## Getting Started

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)
- And the dependencies listed in `package.json`

## Create Database and Tables

Use the code in the `database.sql` file to create the initial database, tables, and test data for the app 

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=superDuperSecret
```

While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [Password Generator Plus](https://passwordsgenerator.net). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

You'll also need to setup an Amazon Web Services Simple Storage Service (AWS S3) bucket to host your photos, see [AWS_S3](https://aws.amazon.com/s3/) to create an account and a bucket. This will give you API key information to put in your .env file like so:

```plaintext
AWS_REGION=
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
AWS_BUCKET=
```

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Testing Routes with Postman

To use the Postman app with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password.
   2. `POST /api/user/login` will login a user, see body to change username/password.
   3. `GET /api/user` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Built With

- [React](https://react.dev/) - JavaScript Library
- [Node.js](https://nodejs.org/en) - Server Runtime Environment
- [Express.js](https://expressjs.com/) - Web Framework

This version uses React, Redux, Node, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Authors

* **Nathaniel Glewwe** - *Initial work* - [GitHub Page](https://github.com/nateglewwe)

## Acknowledgements

- Prime Digital Academy, particularly Myron Schippers, Carlos Kelley, Chris Black, and all my Titanite cohort classmates
- Hawken Rives