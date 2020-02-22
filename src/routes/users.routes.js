const router = require("express").Router();
const {
  renderSignUpForm,
  renderSignUpForm_edit,
  singup,
  updateUser,
  renderSigninForm,
  signin,
  logout,
  deleteUser
} = require("../controllers/user.controller");
const {isAdmin} = require("../helpers/auth");
// Routes
router.get("/users/signup",isAdmin,renderSignUpForm);
router.get("/users/signup/:id",isAdmin,renderSignUpForm_edit);
router.put("/users/signup/:id",isAdmin,updateUser);
router.post("/users/signup",isAdmin,singup);
router.get("/users/logout",logout);
router.post("/", signin);
router.delete("/users/delete/:id",deleteUser);
module.exports = router;
