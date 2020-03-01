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
    const cantidad_producto = await Producto.findById(carrito_compra()[i].id_producto,{stock:1,_id:0}); //buscando producto recuperando su stock
    const cantidad_nueva = cantidad_producto.stock-parseInt(carrito_compra()[i].cantidad);
    await Producto.updateOne({_id:carrito_compra()[i].id_producto},{stock:cantidad_nueva});
    await newVenta.save();
  }
  producto_vender=[];
  res.redirect("/tarea/venta");
}
ventaCtrl.cancelar=(req,res)=>{
  producto_vender=[];
  res.redirect("/tarea/venta");
}
function carrito_compra(producto){
  if (!producto=="") {
    producto_vender.push(producto);
  }
  return producto_vender;
}
function total_monto_pagar(){
  var total_pagar=0;
  for (var i = 0; i < carrito_compra().length; i++) {
    total_pagar=total_pagar+carrito_compra()[i].precio_venta;
  }
  return total_pagar.toFixed(2);
}
ventaCtrl.delete_venta=(req,res)=>{
    for (var i = 0; i < carrito_compra().length; i++) {
      if (req.params.id==carrito_compra()[i].id_producto) {
        carrito_compra().splice(i,1);
      }
    }

  res.redirect("/tarea/venta");
}
ventaCtrl.agregar_venta= async (req,res)=>{
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
