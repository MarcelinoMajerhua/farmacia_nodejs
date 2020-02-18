const reporteCtrl ={};
const Venta = require('../models/Venta');
const User = require('../models/User');

reporteCtrl.renderReporte_all=async (req,res)=>{
  const usuario = await User.find();
  const venta =await Venta.find();
  res.render('reporte/reporte',
  {
    usuario,
    venta,
    vendedor:venta.vendedor,
    nombre:usuario.nombre,
    fecha:venta.fecha,
    nombre_producto:venta.nombre_producto,
    cantidad:venta.cantidad,
    precio_venta:venta.precio_venta
  });
  console.log(venta.precio_venta);
}
reporteCtrl.renderReporte_personal= async(req,res)=>{
  const usuario = await User.find();
  const venta = await Venta.find({"vendedor":req.body.nombre,"fecha":req.body.fecha});
  if (req.body.nombre=="Todos") {
    res.redirect("/tarea/reporte_all");
  } else {
    res.render('reporte/reporte',
    {
      usuario,
      venta,
      vendedor:venta.vendedor,
      nombre:usuario.nombre,
      fecha:venta.fecha,
      nombre_producto:venta.nombre_producto,
      cantidad:venta.cantidad,
      precio_venta:venta.precio_venta
    });
    console.log(venta.precio_venta);
  }
}


module.exports = reporteCtrl;
