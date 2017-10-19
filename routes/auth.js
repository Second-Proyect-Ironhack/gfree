const User = require("../models/User");
const Product = require('../models/Product')
const Place = require('../models/Place')
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const path = require('path');
const passport = require('passport');
const debug = require('debug')("app:auth:local");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const multer = require('multer')
const upload = multer({dest:'public/uploads/'})

const router = require('express').Router();

router.get("/signup", ensureLoggedOut(), (req, res, next) => {
  res.render("signup");
});

router.post("/signup",(req, res, next) => {
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
  successRedirect: "/map",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/logout", ensureLoggedIn(), (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});


router.get('/home', ensureLoggedIn(),(req,res) =>{
  console.log(req.user)
  res.render('home',{ user: req.user});
});

router.get('/profile',ensureLoggedIn(),(req,res)=>{
      Place.find({})
          .then((places)=>(  res.render('profile', {user: req.user, places : places})))


})

router.get('/edit',ensureLoggedIn(),(req,res)=>{
  res.render('edit', {user: req.user})
})

router.post('/:id/edit',ensureLoggedIn(), upload.single('filename'),(req,res)=>{
  const userId = req.params.id;
  const passwordChange = req.body.password;

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(passwordChange, salt);

  const updates = {
        username: req.body.username,
        email: req.body.email,
        password: hashPass,
        picture : {
                      pic_path: `/uploads/${req.file.filename}`,
                      pic_name : req.file.originalname
                    }
  };

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/profile');
  });
})

router.get('/:id/delete', (req, res, next) => {
  const userId = req.params.id;
  User.findByIdAndRemove(userId, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });
});

module.exports = router;
