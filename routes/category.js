const express = require("express");
let router = express.Router();

const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');

/// --------- Rutas para cada categoría --------- ///

//------------ Guitarras
// GET request for list of all Guitar items
router.get("/:name", category_controller.category);


//------------ Brands
// Crear Brand, GET
router.get('/brand/create', brand_controller.brand_create_get);

module.exports = router;
