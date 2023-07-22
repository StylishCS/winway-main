var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();
const passportSetup = require('./passport');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const signupRouter = require('./routes/signup');
var homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const courseRouter = require('./routes/coursesRoutes');
const videos = require('./routes/videos');
const reviewRouter = require('./routes/review')
const quizs = require('./routes/quiz')
const auth = require('./routes/auth');
const facebookAuth = require('./routes/facebookAuth');
const profile = require('./routes/profile');
const modules = require('./routes/module');
const verify = require('./routes/verifyOTP');
const changedPassword = require('./routes/forgotPassword');

const cartRouter = require('./routes/cartRouter')
const videos_watched = require('./routes/videoWatched')
const courseCart = require('./routes/student')

var app = express();


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Winway Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);



app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("upload"));

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/courseRouter', courseRouter)
app.use('/videos', videos)
app.use('/reviews',reviewRouter)
app.use('/quizs',quizs)
app.use('/auth', auth); //http://localhost:3000/auth/google
app.use('/facebook', facebookAuth);
app.use('/profile', profile);
app.use('/module', modules);
app.use('/verify', verify);
app.use('/resetPassword', changedPassword);
app.use('/cart',cartRouter);
app.use('/videos_watched',videos_watched)
app.use('/coursesCart',courseCart)


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
  res.render('error');
});

module.exports = app;
