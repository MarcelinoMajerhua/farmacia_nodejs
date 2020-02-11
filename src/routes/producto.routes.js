const express = require("express");
const router = express.Router();

// Controllers
const { renderProducto, agregar_producto} = require("../controllers/producto.controller"); // se utlizala para renderizar 

router.get("/tarea/agregar_producto",renderProducto); // ruta para agregar producto 
router.post("/tarea/agregar_producto",agregar_producto);

module.exports = router;
