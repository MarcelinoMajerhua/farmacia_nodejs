const express = require("express");
const router = express.Router();

// Controllers
const { renderVenta, agregar_venta} = require("../controllers/venta.controller"); // se utlizala para renderizar 
const { isAuthenticated } = require("../helpers/auth");
router.get("/tarea/venta",isAuthenticated,renderVenta); // ruta para agregar producto 
router.post("/tarea/venta",isAuthenticated,agregar_venta);

module.exports = router;
