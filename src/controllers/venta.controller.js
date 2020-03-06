const ventaCtrl ={};
const Producto= require('../models/Producto');
const Venta = require('../models/Venta')
const {error,getError} = require('../helpers/errors')
var producto_vender= new Array();
ventaCtrl.renderVenta = async (req, res) => {
    const venta_actual=carrito_compra();
    const producto = await Producto.find();
    res.render('venta/venta',{ producto,user:req.user,
      visible:false,
      venta_actual,
      total_monto_pagar:total_monto_pagar()
    });

};
ventaCtrl.vender= async (req,res)=>{
  for (var i = 0; i < carrito_compra().length; i++) {
    const newVenta = new Venta(carrito_compra()[i]);
    await newVenta.save();
  }
  producto_vender=[];
  res.redirect("/tarea/venta");
}
ventaCtrl.cancelar=async (req,res)=>{
  for (var i = 0; i < carrito_compra().length; i++) {
    //agregando los productos cuando se cancela
    const cantidad_producto_c = await Producto.findById({_id:carrito_compra()[i].id_producto},{stock:1,_id:0});
    const cantidad_nueva_c = cantidad_producto_c.stock+parseInt(carrito_compra()[i].cantidad);
    await Producto.updateOne({_id:carrito_compra()[i].id_producto},{stock:cantidad_nueva_c});
  }
  producto_vender=[];
  res.redirect("/tarea/venta");
}

function carrito_compra(producto){
  var encontrado=false;
  if (!producto=="") {
    for (var i = 0; i < carrito_compra().length; i++) {
      if (producto.id_producto==carrito_compra()[i].id_producto) { // buscando producto con el mismo id y sumar su precio total y cantodad
        encontrado=true;
        carrito_compra()[i].cantidad=parseInt(carrito_compra()[i].cantidad)+parseInt(producto.cantidad);
        carrito_compra()[i].precio_venta=parseInt(carrito_compra()[i].precio_venta)+parseInt(producto.precio_venta);
        break;
      }
    }
    if (!encontrado) {//si no se encontro otro producto con el mismo id
      producto_vender.push(producto);
    }
  }
  return producto_vender;
}
function total_monto_pagar(){
  var total_pagar=0;
  for (var i = 0; i < carrito_compra().length; i++) {
    total_pagar=total_pagar+carrito_compra()[i].precio_venta;
  }
  return total_pagar.toFixed(2);//redondeando a dos digistos
}
ventaCtrl.delete_venta=async(req,res)=>{
    for (var i = 0; i < carrito_compra().length; i++) {
      if (req.params.id==carrito_compra()[i].id_producto) {
        const cantidad_producto_d = await Producto.findById({_id:carrito_compra()[i].id_producto},{stock:1,_id:0});
        const cantidad_nueva_d = cantidad_producto_d.stock+parseInt(carrito_compra()[i].cantidad);
        await Producto.updateOne({_id:carrito_compra()[i].id_producto},{stock:cantidad_nueva_d});
        carrito_compra().splice(i,1);
      }
    }
  res.redirect("/tarea/venta");
}
ventaCtrl.agregar_venta= async (req,res)=>{//en este punto se tiene que actualizar el stock
  function addZero(i) {
      if (i < 10) {
          i = '0' + i;
      }
      return i;
  }
      const vendedor = req.user.nombre;
      const fecha_hoy = new Date();
      const fecha =fecha_hoy.getFullYear()+"-"+addZero(fecha_hoy.getMonth()+1)+"-"+addZero(fecha_hoy.getDate());
      const {id_producto,condigo_producto,nombre_producto,cantidad,precio_venta_unidad}=req.body;
      const precio_venta=precio_venta_unidad*cantidad;
      carrito_compra({id_producto,condigo_producto,nombre_producto,cantidad,precio_venta,fecha,vendedor});
      //actualizando stock de producto
      const cantidad_producto = await Producto.findById({_id:id_producto},{stock:1,_id:0});
      const cantidad_nueva = cantidad_producto.stock-parseInt(cantidad);
      await Producto.updateOne({_id:id_producto},{stock:cantidad_nueva});
      //fin de la actualizacion
      res.redirect("/tarea/venta");
}
ventaCtrl.renderVentaForm = async (req, res) => {
  const venta_actual=carrito_compra();
  const producto = await Producto.find();
  const producto_vender = await Producto.findById(req.params.id);
  const id_pruducto = [req.params.id];
  res.render("venta/venta", { producto ,
    codigo:producto_vender.codigo,
    nombre:producto_vender.nombre_producto,
    cantidad:producto_vender.stock,
    precio:producto_vender.precio,
    id_pruducto,
    visible:true,
    venta_actual,
    total_monto_pagar:total_monto_pagar()
  });

};
module.exports = ventaCtrl;
