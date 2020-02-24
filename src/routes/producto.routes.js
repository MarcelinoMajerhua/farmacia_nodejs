const express = require("express");
const router = express.Router();
// Controllers
const { renderProducto,
  edit_producto,
  agregar_producto,
  agregar_nuevo_producto,
  renderProducto_edit,
  renderProducto_add} = require("../controllers/producto.controller"); // se utlizala para renderizar
const { isAuthenticated } = require("../helpers/auth");

router.get("/tarea/agregar_producto",isAuthenticated,renderProducto); // ruta para agregar producto
router.get("/tarea/agregar_producto/edit/:id",isAuthenticated,renderProducto_edit);
router.get("/tarea/agregar_producto/add/:id",isAuthenticated,renderProducto_add);
router.post("/tarea/agregar_producto",isAuthenticated,agregar_nuevo_producto);
router.post("/tarea/add_p",isAuthenticated,agregar_producto)
router.post("/tarea/edit_p",isAuthenticated,edit_producto);

module.exports = router;
