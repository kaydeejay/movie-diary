# movie-diary
a MERN application to keep track of movies you've seen and want to see.
I am building this application as a tutorial, which I will live-code on my [twitch channel](https://www.twitch.tv/kevindejesusjones).

This will be a full-stack MERN application, using Mongo, Express, React, and Node, and will also pull information from the [Open Movie Database API](https://www.omdbapi.com/).

### Prerequisites
In order to build this application, we will need the following already installed:
- Node
- NPM
- Nodemon (I have it installed globally; can be installed as a dev dependency on a per-project basis)
- MongoDB

### Let's Get Started!

Open a terminal window, make a new directory called movie-diary', and `cd` into it.

```mkdir movie-diary && cd movie-diary```

You are now at your application's 'root' level. If you type the command `pwd` into your terminal, you will see something like:

```~/movie-diary```

I will refer to this location as 'the app's root directory' from here on out.

If you plan on saving this project on github/gitlab/any other git-based version control repo, enter the following commands now:

```echo "mern-movies" >> README.md```
```echo "node_modules/" >> .gitignore```

The first command will create a readme file, and the second will ensure that you don't upload all of your npm packages.

### Spin up an Express Server

In the app's root directory, run the following command:

```npx express-generator --no-view```

If you have anything already in the directory (like a readme), you will have to confirm that you want to run the generator (y/n). Select 'y'.
After the generator has run, enter this npm command in your terminal to install dependencies:

```npm install```

And then run the application by entering this command into your terminal to make sure everything installed properly:

```DEBUG=movie-diary:* npm start```

Now, if you open a browser window and enter 'http://localhost:3000' into the url bar, you should see the following: