const errors ={};
const Producto = require('../models/Producto');
const Compra = require('../models/Compra')
const User = require("../models/User")
var total_error=[];
errors.error=(mensaje)=>{//para errores simples, evaluar si existe un producto solo por su nombre ejemplo
    total_error.push(mensaje);
}

errors.getError=()=>{
  return total_error;
}
errors.deleteError=()=>{
  total_error=[];
}
errors.evaluar_error_exitencia=async (codigo,nombre,metodo,dato)=>{ //funcion para evaluar exitencia de un producto por codigo o nombre
  if (metodo=="add") {
    const exitencia = await Producto.find({$or:[{codigo:codigo},{nombre_producto:nombre}]});
    if (exitencia.length!==0) {//exite por lo menos un elemento un error
      total_error.push({mensaje:"el producto "+ exitencia[0].nombre_producto +" con codigo "+exitencia[0].codigo+" ya existe"})
    }
    if (total_error.length==0) {
      const newCompra = new Compra(dato[0]);
      await newCompra.save();
      const newProducto = new Producto(dato[1]);
      await newProducto.save(dato.producto);
    }
  }else {//para actualizar producto
    const dato_original = await Producto.findOne({_id:dato[0]._id},{codigo:1,nombre_producto:1,_id:0});
    const nombre_body=await Producto.findOne({nombre_producto:nombre},{codigo:0,nombre_producto:0});
    const codigo_body= await Producto.findOne({codigo:codigo},{codigo:0,nombre_producto:0});
    if(dato_original.nombre_producto!==nombre){//el nombre enviado por el form es diferente al nombre original
      if (nombre_body) {//el nombre que fue pasado por el form ya exite
        total_error.push({mensaje:"El nombre "+ nombre +" ya está en uso"});
      }
    }else if (dato_original.codigo!==codigo) {//el codigo enviado por el form es diferente al original
      if (codigo_body) {
        total_error.push({mensaje:"El código "+ codigo +" ya está en uso"});
      }
    }
    if (total_error.length==0) {//actualizando dato
      await Producto.updateOne(dato[0],dato[1]);
    }

  }
  }

errors.evaluar_exitencia_usuario=async(dato,id)=>{
  const datos_original_user = await User.find({_id:id},{email:1,nombre:1,_id:0})
  if (datos_original_user[0].email!==dato.email) {
    const email_body = await User.findOne({email:dato.email});
    if (email_body) {
      total_error.push({mensaje:"El email "+ dato.email + " ya está en uso"});
    }
  }else if (datos_original_user[0].nombre!==dato.nombre) {
    const nombre_body =await User.findOne({nombre:dato.nombre});
    if (nombre_body) {
      total_error.push({mensaje:"El nombre " + dato.nombre + " ya esta en uso"});
    }
  }
  if (total_error.length==0) {
    await User.findByIdAndUpdate(id,dato);
  }
}
module.exports=errors;
