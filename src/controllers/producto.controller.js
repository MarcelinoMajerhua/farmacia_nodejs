const productoCtrl = {};
const Producto= require('../models/Producto');


productoCtrl.renderProducto = async (req, res) => {
    const producto = await Producto.find();
    edit_p={valor_producto:false};
    add_p={valor_add:false};
    res.render('producto/nuevo-producto',{ producto ,
      user:req.user,
      categoria:req.user.categoria,
      valor_producto:edit_p.valor_producto,
      valor_add:add_p.valor_add
    });
};
productoCtrl.agregar_producto = async (req,res)=>{
  const {id_add_p,stock} = req.body;
  const stock_actual = await Producto.findById(id_add_p,{stock:1});
  const stock_nuevo = parseInt(stock) + stock_actual.stock;
  await Producto.updateOne({_id:id_add_p},{stock:stock_nuevo});
  res.redirect("/tarea/agregar_producto")
}

productoCtrl.agregar_nuevo_producto= async (req,res)=>{
    const {codigo,nombre_producto,stock,precio}=req.body;
    const newProducto = new Producto({codigo,nombre_producto,stock,precio});
    await newProducto.save();
    res.redirect("/tarea/agregar_producto");
}

productoCtrl.renderProducto_edit=async(req,res)=>{
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
  await Producto.updateOne({_id:id_edit_p},{codigo:codigo,nombre_producto:nombre_producto,precio:precio});
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
module.exports = productoCtrl;
