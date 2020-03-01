const express = require('express');
const router = express.Router();
//controllers
const {addNote,deleteNote}=require("../controllers/nota.controller");
const {isAuthenticated} = require("../helpers/auth");

router.post("/nota/agregar",isAuthenticated,addNote);
router.post("/nota/delete/:id",isAuthenticated,deleteNote);

module.exports = router;
