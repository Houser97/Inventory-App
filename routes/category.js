const express = require("express");
let router = express.Router();

const category_controller = require('../controllers/categoryController');
const brand_controller = require('../controllers/brandController');
const type_controller = require('../controllers/typeController');

const guitar_controller = require('../controllers/guitarController');
const piano_controller = require('../controllers/pianoController');
const violin_controller = require('../controllers/violinController');

/// --------- Rutas para cada categoría --------- ///

//------------ Lista de categorías
// GET request for list of all Guitar items
router.get("/guitars", category_controller.category_guitars);

// GET request for list of all Violin items
router.get("/violins", category_controller.category_violins);

// GET request for list of all Violin items
router.get("/pianos", category_controller.category_pianos);


//------------ Guitarras
// Crear guitarra, GET
router.get('/guitar/create', guitar_controller.guitar_create_get);

// Crear guitarra, POST
router.post('/guitar/create', guitar_controller.guitar_create_post);

// Eliminar guitarra, GET
router.get('/guitars/:id/delete', guitar_controller.guitar_remove_get);

// Eliminar guitarra, POST
router.post('/guitars/:id/delete', guitar_controller.guitar_remove_post);

// Actualizar guitarra, GET
router.get('/guitars/:id/update', guitar_controller.guitar_update_get);

// Actualizar guitarra, POST
router.post('/guitars/:id/update', guitar_controller.guitar_update_post);

// Mostrar un guitarra
router.get('/guitars/:id', guitar_controller.guitar_detail_get);



//------------ Brands
// Crear Brand, GET
router.get('/brand/create', brand_controller.brand_create_get);

// Crear Brand, POST
router.post('/brand/create', brand_controller.brand_create_post);

// Información de type
router.get('/brands/:id', brand_controller.brand_detail_get);


//------------ Type
//Crear Type, GET
router.get('/type/create', type_controller.type_create_get);

// Crear Brand, POST
router.post('/type/create', type_controller.type_create_post);

// Información de type
router.get('/types/:id', type_controller.type_detail_get);


//------------ Pianos
//Ruta creación de piano, GET
router.get('/piano/create', piano_controller.piano_create_get);

//Ruta creación de piano, POST
router.post('/piano/create', piano_controller.piano_create_post);

//Ruta eliminiación de piano, GET
router.get('/pianos/:id/delete', piano_controller.piano_remove_get);

//Ruta eliminiación de piano, POST
router.post('/pianos/:id/delete', piano_controller.piano_remove_post);

//Ruta UPDATE de piano, GET
router.get('/pianos/:id/update', piano_controller.piano_update_get);

//Ruta UPDATE de piano, POST
router.post('/pianos/:id/update', piano_controller.piano_update_post);

// Mostrar una guitarra
router.get('/pianos/:id', piano_controller.piano_detail_get);


//------------ Violines
//Ruta creación de violin, GET
router.get('/violin/create', violin_controller.violin_create_get);

//Ruta creación de violin, POST
router.post('/violin/create', violin_controller.violin_create_post);

//Ruta eliminiación de violin, GET
router.get('/violins/:id/delete', violin_controller.violin_remove_get);

//Ruta eliminiación de violin, POST
router.post('/violins/:id/delete', violin_controller.violin_remove_post);

//Ruta UPDATE de violin, GET
router.get('/violins/:id/update', violin_controller.violin_update_get);

//Ruta UPDATE de violin, POST
router.post('/violins/:id/update', violin_controller.violin_update_post);

// Mostrar un violin
router.get('/violins/:id', violin_controller.violin_detail_get);

module.exports = router;
