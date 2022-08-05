const express = require("express");
let router = express.Router();

const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const type_controller = require('../controllers/typeController');
const guitar_controller = require('../controllers/guitarController');

/// --------- Rutas para cada categoría --------- ///

//------------ Guitarras
// GET request for list of all Guitar items
router.get("/guitars", category_controller.category_guitars);

// GET request for list of all Violin items
router.get("/violins", category_controller.category_violins);

// GET request for list of all Violin items
router.get("/pianos", category_controller.category_pianos);

// Crear guitarra, GET
router.get('/guitar/create', guitar_controller.guitar_create_get);

// Crear guitarra, POST
router.post('/guitar/create', guitar_controller.guitar_create_post);

// Eliminar guitarra, GET
router.get('/guitars/:id/delete', guitar_controller.guitar_remove_get);

// Eliminar guitarra, POST
router.post('/guitars/:id/delete', guitar_controller.guitar_remove_post);




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
