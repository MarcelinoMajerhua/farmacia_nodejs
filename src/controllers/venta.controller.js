const ventaCtrl = {};
const Producto= require('../models/Producto');
const Venta = require('../models/Venta')


ventaCtrl.renderVenta = async (req, res) => {
    const producto = await Producto.find();
    res.render('venta/venta',{ producto,user:req.user});
};

ventaCtrl.agregar_venta= async (req,res)=>{
function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
    const vendedor = req.user.nombre;
    const fecha_hoy = new Date();
    const dia = addZero(fecha_hoy.getDate());
    const mes = addZero(fecha_hoy.getMonth()+1);
    const anio = fecha_hoy.getFullYear();
    const fecha =anio+"-"+mes+"-"+dia;
    console.log(fecha);
    const {condigo_producto,nombre_producto,cantidad,precio_venta}=req.body;
    const newVenta = new Venta({condigo_producto,nombre_producto,cantidad,precio_venta,fecha,vendedor});
    await newVenta.save();
    res.redirect("/tarea/venta");
}
ventaCtrl.renderVentaForm = async (req, res) => {
  const producto = await Producto.find();
  const producto_vender = await Producto.findById(req.params.id);
  res.render("venta/venta", { producto ,codigo:producto_vender.codigo,
    nombre:producto_vender.nombre_producto,
    cantidad:producto_vender.stock,precio:producto_vender.precio});
};
module.exports = ventaCtrl;
