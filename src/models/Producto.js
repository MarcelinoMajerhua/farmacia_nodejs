
const mongoose = require('mongoose');
const{Schema}=mongoose;

const ProductoSchema= new Schema({
    codigo:{type:String,required:true},
    nombre_producto:{type:String,required:true},
    stock:{type:Number,required:true},
    precio:{type:Number,required:true}

});

module.exports=mongoose.model('Producto',ProductoSchema);