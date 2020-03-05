const mongoose = require('mongoose');
const{Schema}=mongoose;

const NotaSchema= new Schema({
    titulo:{type:String,required:true},
    contenido:{type:String,required:true},
    redactor:{type:String,required:true}
});

module.exports=mongoose.model('Nota',NotaSchema);
