const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout ,renderInicio} = require("../controllers/index.controller");
const { isAuthenticated } = require("../helpers/auth");
router.get("/", renderIndex);
router.get("/inicio",isAuthenticated,renderInicio);

module.exports = router;
