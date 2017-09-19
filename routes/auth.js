const User = require("../models/User");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer = require('multer')
const upload = multer({dest:'.public/uploads/'})

const router = require('express').Router();

router.get("/signup", ensureLoggedOut(), (req, res, next) => {
  res.render("signup");
});

router.post("/signup", upload.single('picture'), (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    debug("User created");

    const newUser = new User({
      username,
      email,
      password: hashPass,
      picture : {
                    pic_path: `/uploads/${req.file.filename}`,
                    pic_name : req.file.originalname
                  }
    })
    .save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("signup", { message: "Something went wrong" }));

  });
});


router.get('/login', ensureLoggedOut(),(req,res) =>{
  res.render('login',{ message: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/home', ensureLoggedIn(),(req,res) =>{
  res.render('home',{ user: req.session.currentUser});
});
module.exports = router;
