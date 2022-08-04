const express = require("express");
let router = express.Router();

const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const type_controller = require('../controllers/typeController');

/// --------- Rutas para cada categoría --------- ///

//------------ Guitarras
// GET request for list of all Guitar items
router.get("/:name", category_controller.category);


//------------ Brands
// Crear Brand, GET
router.get('/brand/create', brand_controller.brand_create_get);

// Crear Brand, POST
router.post('/brand/create', brand_controller.brand_create_post);


//------------ Type
//Crear Type, GET
router.get('/type/create', type_controller.type_create_get);

// Crear Brand, POST
router.post('/type/create', type_controller.type_create_post);

module.exports = router;
