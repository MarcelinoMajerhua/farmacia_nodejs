const indexCtrl = {};
const Nota = require("../models/Nota");
const Producto = require("../models/Producto");
indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};


indexCtrl.renderInicio= async (req,res)=>{
  const nota = await Nota.find();
  const producto_sb=await Producto.find({stock:{$lt:5}},{nombre_producto:1,stock:1}); //productos con stock menor a 10
  res.render("general/inicio",
  {user:req.user,
  nota,
  producto_sb
  }

);
};

module.exports = indexCtrl;
