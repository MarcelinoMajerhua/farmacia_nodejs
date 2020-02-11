const router = require("express").Router();
const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/user.controller");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.post("/", signin);
module.exports = router;
