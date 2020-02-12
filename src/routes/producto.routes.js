const express = require("express");
const router = express.Router();
// Controllers
const { renderProducto, agregar_producto} = require("../controllers/producto.controller"); // se utlizala para renderizar 
const { isAuthenticated } = require("../helpers/auth");

router.get("/tarea/agregar_producto",isAuthenticated,renderProducto); // ruta para agregar producto 
router.post("/tarea/agregar_producto",isAuthenticated,agregar_producto);

module.exports = router;
