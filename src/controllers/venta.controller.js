const ventaCtrl ={};
const Producto= require('../models/Producto');
var Venta = require('../models/Venta')
var precio_total= new Array();
ventaCtrl.renderVenta = async (req, res) => {
    const producto = await Producto.find();
    res.render('venta/venta',{ producto,user:req.user});
};
function sumar_precio(precio){
  if (!precio=="") {
    precio_total.push(precio);
  }
  return precio_total;
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
      const cantidad_producto = await Producto.findById(id_producto,{stock:1}); //buscando producto recuperando su stock
      const cantidad_nueva = cantidad_producto.stock-cantidad; //nuevo stock luego de venderse
  //actualizaciones en cada documento
      //await Producto.updateOne({_id:id_producto},{stock:cantidad_nueva});
      //const newVenta = new Venta({condigo_producto,nombre_producto,cantidad,precio_venta,fecha,vendedor});
      sumar_precio({condigo_producto,nombre_producto,cantidad,precio_venta,fecha,vendedor});
      console.log(sumar_precio());
      //await newVenta.save();
      res.redirect("/tarea/venta");
}
ventaCtrl.renderVentaForm = async (req, res) => {
  const producto = await Producto.find();
  const producto_vender = await Producto.findById(req.params.id);
  const id_pruducto = [req.params.id];
  res.render("venta/venta", { producto ,
    codigo:producto_vender.codigo,
    nombre:producto_vender.nombre_producto,
    cantidad:producto_vender.stock,
    precio:producto_vender.precio,
    id_pruducto});

};
module.exports = ventaCtrl;
