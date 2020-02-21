const express = require("express");
const router = express.Router();

//Controllers
const {renderReporte_personal,renderReporte_all} =require("../controllers/reporte.controller");
const {isAuthenticated,isAdmin} = require("../helpers/auth");

router.get("/tarea/reporte_all",isAuthenticated,isAdmin,renderReporte_all);
router.post("/tarea/reporte_personal",isAuthenticated,isAdmin,renderReporte_personal);

module.exports=router;
