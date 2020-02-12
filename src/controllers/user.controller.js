const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { email, password, dni,nombre,categoria} = req.body;
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({  email, password, dni,nombre,categoria });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("/");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/inicio",
    failureRedirect:"/",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/");
};

module.exports = usersCtrl;