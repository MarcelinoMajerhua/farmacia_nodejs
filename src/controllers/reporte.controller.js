const reporteCtrl ={};
const Venta = require('../models/Venta');
const User = require('../models/User');

reporteCtrl.renderReporte_all=async (req,res)=>{
  const nombre_vendedor= await Venta.aggregate([
    {$group:{_id:"$vendedor"}}])
  const venta =await Venta.find();
  res.render('reporte/reporte',
  {
    venta,
    nombre_vendedor
  });
}
reporteCtrl.renderReporte_personal= async(req,res)=>{
  const nombre_vendedor= await Venta.aggregate([
    {$group:{_id:"$vendedor"}}])
  if (!(req.body.nombre=="Todos") && req.body.fecha=="") {
    const venta = await Venta.find({"vendedor":req.body.nombre});
    res.render('reporte/reporte',
      {
        venta,
        nombre_vendedor
      });
  } else if(req.body.nombre=="Todos"&&!(req.body.fecha=="")){
    const venta = await Venta.find({"fecha":req.body.fecha});
    res.render('reporte/reporte',
      {
        venta,
        nombre_vendedor
      });
  }else if(req.body.nombre=="Todos"&&req.body.fecha==""){
    res.redirect("/tarea/reporte_all");
  }else {
    const venta = await Venta.find({"vendedor":req.body.nombre,"fecha":req.body.fecha});
    res.render('reporte/reporte',
      {
        venta,
        nombre_vendedor
      });
  }
}


module.exports = reporteCtrl;
