const Category = require('../models/category');
const Guitar = require('../models/guitar');
const Violin = require('../models/violin');
const Piano = require('../models/piano');

const async = require('async');

// Obtener respectiva categoría y su descripción (Guitarras)
exports.category_guitars = function(req, res, next){
    async.parallel({
        category(callback){
            Category.findOne({name: 'guitars'}).exec(callback)
        },
        guitars(callback){
            Guitar.find().populate('brand').populate('type').exec(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        //let name = req.params.name.charAt(0).toUpperCase();
        //name = name + req.params.name.slice(1);
        res.render("guitar_list", {
            title: 'Guitars',
            category: results.category,
            guitars: results.guitars
        });
    });
}

// Obtener respectiva categoría y su descripción (Violines)
exports.category_violins = function(req, res, next){
    async.parallel({
        category(callback){
            Category.findOne({name: 'violins'}).exec(callback)
        },
        violins(callback){
            Violin.find().populate('brand').populate('type').exec(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        //let name = req.params.name.charAt(0).toUpperCase();
        //name = name + req.params.name.slice(1);
        res.render("item_list", {
            title: 'Violins',
            category: results.category,
            guitars: results.violins
        });
    });
}

// Obtener respectiva categoría y su descripción (Pianos)
exports.category_pianos = function(req, res, next){
    async.parallel({
        category(callback){
            Category.findOne({name: 'pianos'}).exec(callback)
        },
        pianos(callback){
            Piano.find().populate('brand').populate('type').exec(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        //let name = req.params.name.charAt(0).toUpperCase();
        //name = name + req.params.name.slice(1);
        res.render("item_list", {
            title: 'Pianos',
            category: results.category,
            guitars: results.pianos
        });
    });
}