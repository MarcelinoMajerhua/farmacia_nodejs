const ventaCtrl = {};
const Producto= require('../models/Producto');


ventaCtrl.renderVenta = async (req, res) => {
    const producto = await Producto.find();
    res.render('venta/venta',{ producto,user:req.user});
};

ventaCtrl.agregar_venta= async (req,res)=>{
    const vendedor = req.user.nombre;
    const {condigo_producto,nombre_producto,cantidad,fecha}=req.body;
    const newVenta = new Venta({condigo_producto,nombre_producto,cantidad,fecha,vendedor});
    await newVenta.save();
    res.redirect("/venta/venta");
}
module.exports = ventaCtrl;