const express = require("express");
const router = express.Router();

//Controllers
const {renderReporte_personal_venta,
  renderReporte_all_venta,
  renderReporte_all_compra,
  renderReporte_personal_compra
} =require("../controllers/reporte.controller");
const {isAuthenticated,isAdmin} = require("../helpers/auth");

router.get("/tarea/reporte_all/venta",isAuthenticated,isAdmin,renderReporte_all_venta);
router.post("/tarea/reporte_personal/venta",isAuthenticated,isAdmin,renderReporte_personal_venta);
router.get("/tarea/reporte_all/compra",isAuthenticated,isAdmin,renderReporte_all_compra);
router.post("/tarea/reporte_personal/compra",isAuthenticated,isAdmin,renderReporte_personal_compra);

module.exports=router;
