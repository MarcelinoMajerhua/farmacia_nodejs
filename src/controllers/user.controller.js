const usersCtrl = {};
const {getError,deleteError,error,evaluar_exitencia_usuario} = require('../helpers/errors');

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm =  async(req, res) => {
    const total_error=getError();
    const usuario = await User.find();
    deleteError();
    const user_edit={valor:false};
    res.render('users/signup',{usuario,valor:user_edit.valor,
      total_error
    });
};

usersCtrl.updateUser=async(req,res)=>{
  const id = req.params.id;
  evaluar_exitencia_usuario()
  user_update={email,dni,nombre,categoria}=req.body;
  evaluar_exitencia_usuario(user_update,id,"edit");
  res.redirect("/users/signup");
}

usersCtrl.renderSignUpForm_edit =  async(req, res) => {
    const usuario = await User.find();
    const user_edit={valor:true,id:req.params.id};
    const usuario_edit = await User.findById(req.params.id);
    res.render('users/signup',{
      usuario,
      id:user_edit.id,
      valor:user_edit.valor,
      email:usuario_edit.email,
      nombre:usuario_edit.nombre,
      dni:usuario_edit.dni,
      categoria:usuario_edit.categoria,
    });
};

usersCtrl.singup = async (req, res) => {
  const { email, password, celular,nombre,categoria} = req.body;
  const total_error=getError();
  deleteError();
  if (password.length < 8) {
    error.push({ mensaje: "La contraseña tiene que ser mayor a 8 caracteres." });
  }
  if (total_error.length > 0) {
    res.render("users/signup", {
      total_error,
      name,
      email,
      password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({$or:[{email:email},{nombre:nombre}]});
    if (emailUser) {
      error({mensaje:"El email " + email +" o el nombre "+nombre + " ya está en uso."})
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({  email, password, celular,nombre,categoria });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.redirect("/users/signup");
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
usersCtrl.deleteUser = async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/users/signup");
}
module.exports = usersCtrl;
