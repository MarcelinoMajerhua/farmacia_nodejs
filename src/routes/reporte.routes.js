const express = require("express");
const router = express.Router();

//Controllers
const {renderReporte_personal,renderReporte_all} =require("../controllers/reporte.controller");
const {isAuthenticated} = require("../helpers/auth");

router.get("/tarea/reporte_all",isAuthenticated,renderReporte_all);
router.post("/tarea/reporte_personal",isAuthenticated,renderReporte_personal);

module.exports=router;
