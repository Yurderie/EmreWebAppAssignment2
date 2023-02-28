var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
var mongoose = require("mongoose");
var mongodb = require('mongodb');
let userModel = require('./model/user');
let User = userModel.User;
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;

//const mongoDB = "mongodb://127.0.0.1:27017/first_assignment"
//mongoose.Promise = global.Promise;mongoose.connect("mongodb://127.0.0.1:27017/first_assignment");

// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }

mongoose.connect('mongodb://localhost/emreyurderiassignment', { useNewUrlParser: true });

//MongoDB database Schema template
var messageSchema = new mongoose.Schema({
  "firstName": String,
  "email": String,
  "message":String
 });

 const UserMessage = mongoose.model('UserMessage', messageSchema);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//let userListRouter = require('./routes/userList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//setup express session
app.use(session({
  secret:'SomeSecret',
  saveUninitialized:false,
  //resave:false
  reSave:false
}));

//initialize flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
//serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use("/addmessage", (req, res) => {
//   //res.sendFile(__dirname + "/views/Contact.ejs");
//   nameSchema.collection('first_assignment').insertOne({ 
//     name: req.body.firstName, 
//     email:req.body.email,
//     message:req.body.message 
//   }, (err, result) => {
//     console.log("Inserted a document into the messages collection");
//     res.send("Message added");
// })});


app.use("/addmessage", (req, res) => {
  const userMessage = new UserMessage({
    "firstName": req.body.firstName, 
    "email": req.body.email,
    "message": req.body.message
  });
  userMessage.save((error) => {
    if (error) {
      res.send(error);
    } else {
      console.log("Inserted a document into the first_assignment collection");
      res.send("Message added");
    }
  });
});

// var db = new sqlite3.Database("mydb.db")

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/userList',userListRouter);

//add contact information to mongoose. If successful send a message, if not successful send an error
// app.post("/addname", (req, res) => {
//   var myData = new User(req.body);
//   myData.save()
//   .then(item => {
//   res.send("item saved to database");
//   })
//   .catch(err => {
//   res.status(400).send("unable to save to database");
//   });
//  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
