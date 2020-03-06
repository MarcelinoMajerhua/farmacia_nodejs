const productoCtrl = {};
const Producto= require('../models/Producto');
const Compra = require('../models/Compra');
const {error,getError,evaluar_error_exitencia,deleteError} = require('../helpers/errors');
const fecha_actual=fecha();
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
function fecha(){
  const fecha_hoy = new Date();
  return fecha =fecha_hoy.getFullYear()+"-"+addZero(fecha_hoy.getMonth()+1)+"-"+addZero(fecha_hoy.getDate());
}
productoCtrl.renderProducto = async (req, res) => {
    const producto = await Producto.find();
    edit_p={valor_producto:false};
    add_p={valor_add:false};
    const error_total = getError();
    deleteError();
    res.render('producto/nuevo-producto',{ producto ,
      user:req.user,
      categoria:req.user.categoria,
      valor_producto:edit_p.valor_producto,
      valor_add:add_p.valor_add,
      error_total
    });
};
productoCtrl.agregar_producto = async (req,res)=>{ //manda los datos el popup add_producto
  nombre=req.user.nombre;
  const {id_add_p,codigo,nombre_producto,stock,precio_total_compra} = req.body;
  const newCompra = new Compra({condigo_producto:codigo,nombre_producto,cantidad:stock,precio_compra:precio_total_compra,fecha:fecha_actual,vendedor:nombre});
  await newCompra.save();
  const stock_actual = await Producto.findById(id_add_p,{stock:1});
  const stock_nuevo = parseInt(stock) + stock_actual.stock;
  await Producto.updateOne({_id:id_add_p},{stock:stock_nuevo});
  res.redirect("/tarea/agregar_producto")
}
productoCtrl.agregar_nuevo_producto= async (req,res)=>{
    nombre=req.user.nombre;
    var {codigo,tipo_producto,nombre_producto,stock,precio,precio_total_compra}=req.body;
    var nombre_compuesto = tipo_producto + " " +nombre_producto;
    console.log(nombre_compuesto);
    newCompra = {condigo_producto:codigo,nombre_producto:nombre_compuesto,cantidad:stock,precio_compra:precio_total_compra,fecha:fecha_actual,vendedor:nombre};
    newProducto={codigo,nombre_producto:nombre_compuesto,stock,precio};
    evaluar_error_exitencia(codigo,nombre_compuesto,"add",[newCompra,newProducto]);
    res.redirect("/tarea/agregar_producto");
}
productoCtrl.renderProducto_edit=async(req,res)=>{//carga en la pantalla
  const producto = await Producto.find();
  edit_p={valor_producto:true};
  add_p={valor_add:false};
  const producto_editar = await Producto.findById(req.params.id,{nombre_producto:1,precio:1,codigo:1});
  const producto_add = await Producto.findById(req.params.id);
  res.render('producto/nuevo-producto',{ producto ,
    user:req.user,
    producto_editar,
    valor_producto:edit_p.valor_producto,
    valor_add:add_p.valor_add
  });
}
productoCtrl.edit_producto = async (req,res)=>{
  const {id_edit_p,codigo,nombre_producto,precio} = req.body;
  id={_id:id_edit_p};
  dato_actualizar={codigo:codigo,nombre_producto:nombre_producto,precio:precio};
  evaluar_error_exitencia(codigo,nombre_producto,"edit",[id,dato_actualizar]);
  res.redirect("/tarea/agregar_producto");
}
productoCtrl.renderProducto_add=async(req,res)=>{
  const producto = await Producto.find();
  const producto_add = await Producto.findById(req.params.id,{codigo:1,nombre_producto:1,stock:1,_id:1});
  edit_p={valor_producto:false};
  add_p={valor_add:true};
  res.render('producto/nuevo-producto',{ producto ,
    user:req.user,
    categoria:req.user.categoria,
    valor_producto:edit_p.valor_producto,
    valor_add:add_p.valor_add,
    producto_add
  });
}
productoCtrl.delete_producto=async(req,res)=>{
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect("/tarea/agregar_producto")
}
module.exports = productoCtrl;
