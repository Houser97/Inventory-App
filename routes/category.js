const express = require("express");
let router = express.Router();

const category_controller = require('../controllers/categoryController');

/// --------- Rutas para cada categoría --------- ///

//------------ Guitarras
// GET request for list of all Guitar items
router.get("/:name", category_controller.category);

module.exports = router;
