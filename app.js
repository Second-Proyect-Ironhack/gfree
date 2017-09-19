const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const errors = require('./config/errors')


if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}


const authRoutes = require('./routes/auth');
const debug = require('debug')("app:"+path.basename(__filename).split('.')[0]);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to DB"));

        if (process.env.NODE_ENV === 'development') {
          require('dotenv').config()
        }

var app = express();

const index = require('./routes/index');
const places = require('./routes/places')
const products = require('./routes/products')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// default value for title local
app.locals.title = 'Gfree';
app.locals.subtitle = 'Look for gluten free places around the world';
app.use(expressLayouts);
app.use(flash());

app.use((req,res,next) =>{
  res.locals.title = "Gfree";
  next();
});




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: "asdfasdf",
  cookie: {
    maxAge: 60000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
require('./passport/serializers');
require('./passport/local');

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.initialize())
app.use(passport.session())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.get('/', (req,res) => {console.log(req.user)
res.render('index',{user:req.user})});
app.use('/', places);
app.use('/', products)


app.use(errors)

module.exports = app;
