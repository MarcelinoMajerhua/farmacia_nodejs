const mongoose = require('mongoose');
const {Schema}=mongoose;
const VentaSchema = new Schema({
    nombre_producto:{type:String, require:true},
    cantidad:{type:Number, require:true},
    fecha:{type:Date, require:true},
    vendedor:{type:String,required:true}

});

module.exports=mongoose.model('Venta',VentaSchema);