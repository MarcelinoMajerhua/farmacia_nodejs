const reporteCtrl ={};
const Venta = require('../models/Venta');
const Compra = require('../models/Compra');
reporteCtrl.renderReporte_all_venta=async (req,res)=>{//valor de nombre Todos y sin fecha
    const nombre_vendedor= await Venta.aggregate([
      {$group:{_id:"$vendedor"}}])
    const total_pagar= await Venta.aggregate([
    {$group:{_id:null,
      "total":{$sum:"$precio_venta"}}}
    ]);
  const venta =await Venta.find();
  res.render('reporte/reporte',
  {
    venta,
    nombre_vendedor,
    total:total_pagar[0].total,
    visible_venta
  });
}
const visible_venta=true;
reporteCtrl.renderReporte_personal_venta= async(req,res)=>{
  const nombre = req.body.nombre;
  const fecha = req.body.fecha;
  const nombre_vendedor= await Venta.aggregate([
    {$group:{_id:"$vendedor"}}])//recuperando todos los vendedores
  if (!(nombre=="Todos") &&fecha=="") {//cuando tiene nombre pero no fecha
    const venta = await Venta.find({"vendedor":nombre});
    if (venta.length!==0) {
      const total_pagar= await Venta.aggregate([
        {$match:{"vendedor":nombre}},
        {$group:{_id:null,
          "total":{$sum:"$precio_venta"}}}
        ]);
        res.render('reporte/reporte',
          {
            venta,
            nombre_vendedor,
            total:total_pagar[0].total,
            visible_venta
          });
    }else {
      total_pagar=[{total:0}];
      res.render('reporte/reporte',
        {
          venta,
          nombre_vendedor,
          total:total_pagar[0].total,
          visible_venta
        });
    }
  } else if(nombre=="Todos"&&!(fecha=="")){//cuando el valor de nombre es todo y tiene fecha
    const venta = await Venta.find({"fecha":fecha});
    if (venta.length!==0) {
      const total_pagar= await Venta.aggregate([
        {$match:{"fecha":fecha}},
        {$group:{_id:null,
          "total":{$sum:"$precio_venta"}}}
        ]);
        res.render('reporte/reporte',
          {
            venta,
            nombre_vendedor,
            total:total_pagar[0].total,
            visible_venta
          });
    }else {
      total_pagar=[{total:0}];
      res.render('reporte/reporte',
        {
          venta,
          nombre_vendedor,
          total:total_pagar[0].total,
          visible_venta
        });
    }
  }else if(nombre=="Todos"&&fecha==""){//cuando el valor nombre es Todos y no tiene fecha
    res.redirect("/tarea/reporte_all/venta"
  );
  }else {
    const venta = await Venta.find({"vendedor":nombre,"fecha":fecha});//cuando nombre tiene valor y tiene fecha
    if (venta.length!==0) {
      const total_pagar= await Venta.aggregate([
        {$match:{"fecha":fecha,"vendedor":nombre}},
        {$group:{_id:null,
          "total":{$sum:"$precio_venta"}}}
        ]);
        res.render('reporte/reporte',
          {
            venta,
            nombre_vendedor,
            total:total_pagar[0].total,
            visible_venta
          });
    }else {
      total_pagar=[{total:0}];
      res.render('reporte/reporte',
        {
          venta,
          nombre_vendedor,
          total:total_pagar[0].total,
          visible_venta
        });
    }

  }
}
reporteCtrl.renderReporte_all_compra=async(req,res)=>{
  const nombre_comprador= await Compra.aggregate([//consultando el nombre de los compradores
    {$group:{_id:"$vendedor"}}])
  const total_compra= await Compra.aggregate([//consultado el total de las compras
  {$group:{_id:null,
    "total":{$sum:"$precio_compra"}}}
  ]);
const compra =await Compra.find(); // el total de las compras de todo los tiempos
res.render('reporte/reporte',
{
  compra,
  nombre_comprador,
  total:total_compra[0].total,
});
}
reporteCtrl.renderReporte_personal_compra=async(req,res)=>{
  const nombre = req.body.nombre;
  const fecha = req.body.fecha;
  const nombre_comprador= await Compra.aggregate([
    {$group:{_id:"$vendedor"}}])//recuperando todos los vendedores

  if (!(nombre=="Todos") &&fecha=="") {//cuando tiene nombre pero no fecha
    const compra = await Compra.find({"vendedor":nombre});
    if (compra.length!==0) {
      const total_compra= await Compra.aggregate([
        {$match:{"vendedor":nombre}},
        {$group:{_id:null,
          "total":{$sum:"$precio_compra"}}}
        ]);
        res.render('reporte/reporte',
          {
            compra,
            nombre_comprador,
            total:total_compra[0].total,
          });
    }else {
      total_compra=[{total:0}];
      res.render('reporte/reporte',
        {
          compra,
          nombre_comprador,
          total:total_compra[0].total,
        });
    }
  } else if(nombre=="Todos"&&!(fecha=="")){//cuando el valor de nombre es todo y tiene fecha
    const compra = await Compra.find({"fecha":fecha});
    if (compra.length!==0) {
      const total_compra= await Compra.aggregate([
        {$match:{"fecha":fecha}},
        {$group:{_id:null,
          "total":{$sum:"$precio_compra"}}}
        ]);
        res.render('reporte/reporte',
          {
            compra,
            nombre_comprador,
            total:total_compra[0].total,
          });
    }else {
      total_compra=[{total:0}];
      res.render('reporte/reporte',
        {
          compra,
          nombre_comprador,
          total:total_compra[0].total,
        });
    }
  }else if(nombre=="Todos"&&fecha==""){//cuando el valor nombre es Todos y no tiene fecha
    res.redirect("/tarea/reporte_all/compra"
  );
  }else {
    const compra = await Compra.find({"vendedor":nombre,"fecha":fecha});//cuando nombre tiene valor y tiene fecha
    if (compra.length!==0) {
      const total_compra= await Compra.aggregate([
        {$match:{"fecha":fecha,"vendedor":nombre}},
        {$group:{_id:null,
          "total":{$sum:"$precio_compra"}}}
        ]);
        res.render('reporte/reporte',
          {
            compra,
            nombre_comprador,
            total:total_compra[0].total,
          });
    }else {
      total_compra=[{total:0}];
      res.render('reporte/reporte',
        {
          compra,
          nombre_comprador,
          total:total_compra[0].total,
        });
    }

  }
}
module.exports = reporteCtrl;
