const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport Config
require('./config/passport')(passport);
// DB Config
const db = require('./config/database');

//Map global promise to get rid of warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose
  .connect(db.mongoURI, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Mongo DB Connected..."))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});


// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});

// node main.js starts a server , use ctrl+c int terminal to stop it
// "Cannot GET / is displayed " means it can't find the route
//there are a bunch of requests for http
// one of them is a get request for example  ( when a user types in a url)
//another function like app.put will update in a db
//app.delete handles delete requests
//req is request and res is a response
//res.send will something to the  db
//installing globally  '-g' means it's not added to the node modules folder
// to display  the location of the folder 'local npm root -g '
// using nodemon means I don't have to restart the server every time to see changes
// 'nodemon app.js' in the terminal to see the changes
// Jwt= JSON web token
//all middleware functions have 3 parameters , req,res,next . the 'next' parameter is required to chain two functions and
// it is need to go from function to function
//express uses a views directory
//handlebars must have a public directory that contains all non static elements (css, imgs)
//the layout is a view that wraps around all of your other views it contains the things that you want include in every page
//main.handlebars will include the CDNs

//when using the edit page we can't just update using a form or a button
// so we use  a module called "method-override"

//we will need a put request 
//by default we can't let the form's method from "post" to "put"
//that's why we will need the method override , since we're overriding the form's method
//alternative: make an ajax put request
//we will override using a query value 
//with the increase of number of pages in our web app
//the routes added to app.js are increasing , so we will 
// create a directory that will contain all of our routes
//we will need to connect our routes file here
// ../ means you will go outside the folder that your file exists in and then inside another directory
//to use heroku we need to add a start script in the manifest.json file, since heroku uses npm start
// when deploying to heroku you want to have your port set to process.env.PORT