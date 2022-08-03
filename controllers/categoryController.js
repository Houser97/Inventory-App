const Category = require('../models/category');
const Guitar = require('../models/guitar');

const async = require('async');

// Obtener respectiva categoría y su descripción
exports.category = function(req, res, next){
    async.parallel({
        category1(callback){
            Category.findOne({"name": req.params.name}).exec(callback)
        },
        guitars(callback){
            Guitar.find(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        let name = req.params.name.charAt(0).toUpperCase();
        name = name + req.params.name.slice(1);
        res.render("item_list", {
            title: name,
            category: results.category1,
            guitars: results.guitars
        });
    });
}