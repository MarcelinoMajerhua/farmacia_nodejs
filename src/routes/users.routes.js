const router = require("express").Router();
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/user.controller");
const {isAdmin} = require("../helpers/auth");
// Routes
router.get("/users/signup",isAdmin,renderSignUpForm);
router.get("/users/signup/:id",isAdmin,renderSignUpForm_edit);
router.post("/users/signup",isAdmin,singup);

router.post("/", signin);
module.exports = router;
