const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const passport     =require('passport');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const errors = require('./config/errors')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGO_URI);
const authRoutes = require('./routes/auth');
const index = require('./routes/index');
const places = require('./routes/places')
const products = require('./routes/products')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// default value for title local
app.locals.title = 'Gfree';
app.locals.subtitle = 'Look for gluten free places around the world';

app.use(session({
  secret: "asdfasdf",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));


require('./config/serializers');
require('./config/local');
app.use(passport.initialize())
app.use(passport.session())
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);



app.use('/', index);
app.use('/', authRoutes);
app.use('/', products);
app.use('/', places);
app.use(errors)

module.exports = app;
