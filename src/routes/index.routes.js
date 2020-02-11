const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout ,renderInicio} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/inicio",renderInicio);

module.exports = router;
