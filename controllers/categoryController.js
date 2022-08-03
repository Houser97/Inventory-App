const Category = require('../models/category');

// Obtener respectiva categoría y su descripción
exports.category = function(req, res, next){
    Category.find({"name": req.params.name})
}