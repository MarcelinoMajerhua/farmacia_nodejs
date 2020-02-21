const mongoose = require('mongoose');
const {Schema}=mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    dni:{type:String,required:true},
    nombre:{type:String,require:true},
    categoria:{type:Boolean,required:true}
});


UserSchema.methods.encryptPassword = async (password)=> {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports=mongoose.model('User',UserSchema);
