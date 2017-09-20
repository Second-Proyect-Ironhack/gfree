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
const mongoose = require("mongoose");
const debug = require('debug')("app:"+path.basename(__filename).split('.')[0]);


module.exports = function(app) {
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
  }
  mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected to DB"));
  if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
  }
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
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(session({
    secret: "asdfasdf",
    cookie: {
      maxAge: 600000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
}
