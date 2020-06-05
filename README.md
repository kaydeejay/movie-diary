# movie-diary
a MERN application to keep track of movies you've seen and want to see.
I am building this application as a tutorial, which I will live-code on my [twitch channel](https://www.twitch.tv/kevindejesusjones).

This will be a full-stack MERN application, using Mongo, Express, React, and Node, and will also pull information from the [Open Movie Database API](https://www.omdbapi.com/).

## Prerequisites
In order to build this application, we will need the following already installed:
- Node
- NPM
- Nodemon (I have it installed globally; can be installed as a dev dependency on a per-project basis)
- MongoDB
- Mongoose CLI (Installation instructions below)

## Let's Get Started!

Open a terminal window, make a new directory called movie-diary', and `cd` into it.

```mkdir movie-diary && cd movie-diary```

You are now at your application's 'root' level. If you type the command `pwd` into your terminal, you will see something like:

```~/movie-diary```

I will refer to this location as 'the app's root directory' from here on out.

If you plan on saving this project on github/gitlab/any other git-based version control repo, enter the following commands now:

```echo "mern-movies" >> README.md```
```echo "node_modules/" >> .gitignore```

The first command will create a readme file, and the second will ensure that you don't upload all of your npm packages.

## Spin up an Express Server

In the app's root directory, run the following command:

```npx express-generator --no-view```

If you have anything already in the directory (like a readme), you will have to confirm that you want to run the generator (y/n). Select 'y'.
After the generator has run, enter this npm command in your terminal to install dependencies:

```npm install```

And then run the application by entering this command into your terminal to make sure everything installed properly:

```DEBUG=movie-diary:* npm start```

Now, if you open a browser window and enter 'http://localhost:3000' into the url bar, you should see the following:

![Express Success Message](https://raw.githubusercontent.com/kaydeejay/movie-diary/master/public/images/express-success.png)

In your terminal window, type Ctrl+C to shut down the server.

### What did we just do?

`NPX` comes bundled with NPM, but unlike NPM, it downloads *and* runs the package.
Express-Generator is an executable NPM package that generates a boilerplate express server for you. At this stage, all it does is create a server that runs on localhost:3000, and serves a success message. Later on we will add some things to our server, like the connection to our mongo database. 
--no-view: Express-generator has built-in functionality to add templating engines to your server, like EJS, Handlebars, or Pug (among others). We won't be needing a templating engine since we are going to use React, so the --no-view flag lets express generator know that it can do a little less.

Before moving on to the database, let's add a "watch" script to `package.json`:
```
"scripts": {
  "start": "node ./bin/www",
  "watch": "nodemon ./bin/www"
}
```
This will allow you to run the server using nodemon by entering `npm run watch` into the terminal. Nodemon will listen for changes saved to the server, so you don't have to kill & re-run it every time you need to make a change. 

## Generate Database and Models

We're going to use `Mongoose-cli` to generate our database models. You can read all about Mongoose-cli [here](https://github.com/codesmith-admin/mongoose-model-cli). 

If you don't have it installed, do so via npm (here we are doing it globally):
```
npm install -g mongoose-model-cli
mongoose help
```
These two commands will install mongoose-cli globally and show successful installation.

We can then generate a `movie` model, with fields for information we will get from the Open Movie Database.
```
mongoose generate model movie title:string release:date poster:string directors:string writers:string cast:string link:string seen:boolean
```