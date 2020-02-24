const express = require("express");
const router = express.Router();

// Controllers
const { renderVenta, agregar_venta,renderVentaForm,delete_venta} = require("../controllers/venta.controller"); // se utlizala para renderizar
const { isAuthenticated } = require("../helpers/auth");
router.get("/tarea/venta",isAuthenticated,renderVenta); // ruta para agregar producto
router.get("/tarea/venta/:id",isAuthenticated,renderVentaForm);
router.post("/tarea/venta",isAuthenticated,agregar_venta);
router.post("/tarea/venta/delete/:id",isAuthenticated,delete_venta);

module.exports = router;
