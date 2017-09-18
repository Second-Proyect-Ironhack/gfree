const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/User");
const multer = require('multer');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const upload = multer({
  dest: './public/uploads/'
});


router.get('/signup', (req, res, next) => {
  res.render('signup')
})
router.get('/login', ensureLoggedOut('/home'), (req, res, next) => {
  res.render('login')
})

router.post('/signup', ensureLoggedOut(), upload.single('avatar'), (req, res, next) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    picture: {
      pic_path: `/uploads/${req.file.avatar}`,
      pic_name: req.file.avatar
    }
  });

  if (newUser.email === '' || newUser.password === '') {
    res.render('signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }

  User.findOne({
    email: newUser.email
  }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }

    if (existingUser !== null) {
      res.render('signup', {
        errorMessage: `The email ${newUser.email} is already in use.`
      });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(newUser.password, salt);

    const userSubmission = {
      name: newUser.name,
      email: newUser.email,
      password: hashedPass,
      picture: newUser.picture

    };

    const theUser = new User(userSubmission);

    theUser.save((err) => {
      if (err) {
        res.render('signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }

      res.redirect('/');
    });


  })

})

// router.post('/login', ensureLoggedOut('/home'), (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (email === "" || password === "") {
//     res.render("login", {
//       errorMessage: "Indicate a username and a password to sign up"
//     });
//     return;
//   }
//
//   User.findOne({
//     "email": email
//   }, (err, user) => {
//     if (err || !user) {
//       res.render("login", {
//         errorMessage: "The username doesn't exist"
//       });
//       return;
//     }
//     if (bcrypt.compareSync(password, user.password)) {
//       // Save the login in the session!
//
//       req.session.currentUser = user;
//       req.locals.user= user;
//       res.redirect("home");
//     } else {
//       res.render("login", {
//         errorMessage: "Incorrect password"
//       });
//     }
//   });
// })

router.get('/home', (req, res) => {
  console.log(req.session.currentUser)
  res.render('home', {
    user: req.locals.user
  });
});

module.exports = router;
