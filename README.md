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
- Mongoose CLI
- Postman

## Let's Get Started!

Open a terminal window, make a new directory called movie-diary', and `cd` into it.
```
mkdir movie-diary && cd movie-diary
```

You are now at your application's 'root' level. If you type the command `pwd` into your terminal, you will see something like:
```
~/movie-diary
```

I will refer to this location as 'the app's root directory' from here on out.

If you plan on saving this project on github/gitlab/any other git-based version control repo, enter the following commands now:
```
echo "mern-movies" >> README.md
echo "node_modules/" >> .gitignore
```

The first command will create a readme file, and the second will ensure that you don't upload all of your npm packages.

## Spin up an Express Server

In the app's root directory, run the following command:
```
npx express-generator --no-view
```

If you have anything already in the directory (like a readme), you will have to confirm that you want to run the generator (y/n). Select 'y'.
After the generator has run, enter this npm command in your terminal to install dependencies:
```
npm install
```

Add another dependency:
```
npm install mongoose --save
```

And then run the application by entering this command into your terminal to make sure everything installed properly:
```
DEBUG=movie-diary:* npm start
```

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
mongoose generate model movie title:string release:date poster:string directors:string writers:string cast:string metascore:number seen:boolean
```

Let's look at the new files and folders we have in our directory:
```
movie-diary/
  models/
    migrations/
    seed/
    all-models.js
    connection-string.js
    Movie.js
```

Mongoose-cli has generated our 'Movie' model, along with some helper files to connect it to your application. 

Mongoose has a built-in feature that will update `connection-string.js` with your MongoDB Connection URI.
First let's open `connection-string.js`, and note that it sets a variable as an empty string:
```
var uri = '';
```
Then, in the terminal, we can run:
```
mongoose setUri <uri>
```

And it will change the value of that variable in `connection-string.js` to the value you input in \<uri\>.

Note that if you need to set the connection uri to be variable, like if you are planning on deploying this application on heroku or elsewhere, you should just edit this string directly, for example:
```
var uri = process.env.MONGODB_URI || <uri>;
```

Let's use `seed/seedfile.js` to give our database an entry for us to work with. Again, mongoose-cli has made this very clear for us with comments telling us where and how to input our data. Following their example and removing the comments, we'll end up with a file that looks like this:
```
var mongoose = require('mongoose');

require('../all-models').toContext(global);

Movie.create([
   {
     title: 'The Princess Bride',
     release: new Date('1987-10-09'),
     poster: 'https://m.media-amazon.com/images/M/MV5BMGM4M2Q5N2MtNThkZS00NTc1LTk1NTItNWEyZjJjNDRmNDk5XkEyXkFqcGdeQXVyMjA0MDQ0Mjc@._V1_SX300.jpg',
     directors: 'Rob Reiner',
     writers: 'William Goldman (screenplay by), William Goldman (based upon his book)',
     cast: 'Cary Elwes, Mandy Patinkin, Chris Sarandon, Christopher Guest',
     metascore: 77,
     seen: true
   }
 ])

 .then(() => {
   console.log("Seed complete!")  
   mongoose.connection.close();
 });

```

Now we can insert this data into our database by running the seedfile with node.
```node models/seed/seedfile.js```
Or, we could add a script to `package.json`, and then run it with npm.
```
"scripts": {
  "seed": "node models/seed/seedfile.js"
}
```
```
npm run seed
```

To make sure it worked, you can run mongo in your terminal and enter the following:
```
use <database name>
db.movies.find()
```

And you should see the result you seeded. Now let's:
- connect this database to our server
- build a controller to manipulate our data
- add some api routes so that we can do that via the browser
- test it all with postman.

## Connect Database to the Server:

In `app.js`, let's make a few changes.
```
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// add this line:
var mongoose = require('mongoose');

/*
* change these routers. Currently they should look like this:
*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// let's delete those and instead say:
var apiRouter = require('./routes/apiRoutes');
/*
* We will need to make more changes below in order for this to work properly.
*/

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add this if you plan to deploy:
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}

/*
* As we did above, let's also change these so that it instead points to the apiRoutes.js file that we will create. Currently it looks like this:
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);

// change it to look like this:
app.use('/api', apiRouter);

/*
* And then add this line to get the server ready for React:
*/
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

/*
* And finally, a few lines to make the mongoDB connection:
*/
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movieDiary', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
```

If you don't plan on deploying, your `mongoose.connect` be simplified to this:
```
mongoose.connect('mongodb://localhost/movieDiary', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
```

## Database Controllers & API Routes

In keeping with the changes to the routers that we just made above, let's delete `routes/users.js` and rename `routes/index.js` to `routes/apiRoutes.js`. In the terminal, at root directory:
```
rm routes/users.js && mv routes/index.js routes/apiRoutes.js
```

We're going to add a bunch of routes to `apiRoutes.js` that will allow us to perform CRUD (create, read, update, delete) functions on the database. First, though, we are going to build a controller that the router will use to perform these functions. So, in the terminal, at root directory, let's make our controller.
```
mkdir models/controllers && touch models/controllers/movieController.js
```

`movieController` will contain the following. I have put the functions in CRUD order.
```
const Movie = require('../models/Movie');

module.exports = {
  // ======== CREATE ========
  addMovie: (req, res) => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ success: false, error: 'No movie provided' });
    }
    const movie = new Movie(body);
    if (!movie) {
      return res.status(400).json({ success: false, error: err });
    }
    movie.save()
      .then((result) => {
        return res.status(201).json({
          success: true,
          id: movie._id,
          message: 'Successfully added movie'
        })
      })
      .catch(err => {
        return res.status(400).json({
          err,
          message: 'Failed to add movie'
        });
      });
  },
  // ======== READ: ========
  findAll: async (req, res) => {
    await Movie.find({}).sort({ createdAt: 1 }).exec((err, movies) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!movies.length) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true, data: movies });
    });
  },

  findById: async (req, res) => {
    await Movie.findOne({ _id: req.params.id }, (err, movie) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!movie) {
        return res.status(404).json({ success: false, error: 'Movie not found' });
      }
      return res.status(200).json({ success: true, data: movie });
    })
      .catch(err => console.log(err));
  },
  // ======== UPDATE: ========
  updateMovie: async (req, res) => {
    const body = req.body
    if (!body) {
      return res.status(400).json({ success: false, error: "You must provide a movie to update" });
    }
    await Movie.findOneAndUpdate(
      { _id: body._id },
      {
        seen: body.seen,
        updatedAt: Date.now()
      },
      // passing { new: true } assures that the function will return
      // the NEW document and not the old one.
      { new: true }
    )
      .then(update => {
        return res.json({ success: true, post: update });
      });
  },
  // ======== DELETE ========
  deleteById: async (req, res) => {
    await Movie.findByIdAndDelete(
      { _id: req.params.id },
    )
      .then(result => res.json({ success: true, deleted: result.title }));
  }
}
```

Now that we've got our controller, let's build out our API routes to use them in order to create, read, update, and delete database entries.

In `routes/apiRoutes.js`, let's just add a couple and then test them to make sure they're working:
```
var express = require('express');
var router = express.Router();
const movieController = require('../models/controllers/movieController');

/* root directory: /api/ */

// ======== READ ========
router.get('/movies', movieController.findAll);
router.get('/movies/:id', movieController.findById);

module.exports = router;
```

Now if we run our server (`npm run watch` in the terminal), we can use postman to make sure these two simple get routes work.
![Successful Postman Get Request](./public/images/postman-gets.png)

Assuming we don't encounter any errors, we can go ahead and add the rest of our routes.

```
// ======== CREATE ========
router.post('movies/new', movieController.addMovie);

// ======== READ ========
router.get('/movies', movieController.findAll);
router.get('/movies/:id', movieController.findById);

// ======== UPDATE ========
router.put('/movies/update', movieController.updateMovie);

// ======== DELETE ========
router.put('/movies/delete/:id', movieController.deleteById);
```

Try using postman to add another entry, retrieve an entry by ID or all entries, edit whether it's been 'seen', and delete it.