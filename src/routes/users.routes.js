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
const {isAdmin,isAuthenticated} = require("../helpers/auth");
// Routes
router.get("/users/signup",isAuthenticated,isAdmin,renderSignUpForm);
router.get("/users/signup/:id",isAuthenticated,isAdmin,renderSignUpForm_edit);
router.put("/users/signup/:id",isAuthenticated,isAdmin,updateUser);
router.post("/users/signup",isAuthenticated,isAdmin,singup);
router.get("/users/logout",logout);
router.post("/", signin);
router.delete("/users/delete/:id",isAuthenticated,isAdmin,deleteUser);
module.exports = router;
