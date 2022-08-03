const express = require("express");
const router = express.Router();

/// --------- Rutas para cada categoría --------- ///

//------------ Guitarras
// GET request for list of all Guitar items
router.get("/guitars", function(req, res){
    res.render("guitar_list", {
        title: 'Guitars',
    })
})

module.exports = router;
