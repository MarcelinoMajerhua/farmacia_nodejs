const productoCtrl = {};
const Producto= require('../models/Producto');


productoCtrl.renderProducto = async (req, res) => {
    const producto = await Producto.find();
    res.render('producto/nuevo-producto',{ producto ,user:req.user});
};

productoCtrl.agregar_producto= async (req,res)=>{
    const {codigo,nombre_producto,stock,precio}=req.body;
    const newProducto = new Producto({codigo,nombre_producto,stock,precio});
    await newProducto.save();
    res.redirect("/producto/agregar");
}
module.exports = productoCtrl;