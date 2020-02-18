const mongoose = require('mongoose');
const {Schema}=mongoose;
const VentaSchema = new Schema({
    condigo_producto:{type:String,require:true},
    nombre_producto:{type:String, require:true},
    cantidad:{type:Number, require:true},
    precio_venta:{type:Number, require:true},
    fecha:{type:String, require:true},
    vendedor:{type:String,required:true}

});

module.exports=mongoose.model('Venta',VentaSchema);
