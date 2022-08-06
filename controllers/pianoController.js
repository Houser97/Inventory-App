const Piano = require('../models/piano');
const Brand = require('../models/brand');
const Type = require('../models/type');

const async = require('async');
const { body ,validationResult } = require('express-validator');

// Petición para CREAR piano, GET
exports.piano_create_get = function(req, res, next){
    async.parallel({
        brands(callback){
            Brand.find(callback);
        },
        types(callback){
            Type.find(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        res.render('piano_form', {
            title: "Create Piano",
            brands: results.brands,
            types: results.types,
        });
    });
};

// Petición para CREAR piano, POST
exports.piano_create_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('type', 'Type must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
    body('stock', 'Stock must be specified').trim().isLength({min: 1}),
    body('brand', 'Brand must be specified').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const piano = new Piano({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            number_in_stock: req.body.stock,
            brand: req.body.brand,
        });

        if(!errors.isEmpty()){
            async.parallel({
                brands(callback){
                    Brand.find(callback);
                },
                types(callback){
                    Type.find(callback);
                },
            }, function(err, results){
                if(err){ return next(err); }
                res.render("piano_form", {
                    title: "Create Piano",
                    piano: piano,
                    brands:results.brands,
                    types: results.types,
                    errors: errors.array(),
                });
                return;
            })
        } else {
            piano.save(function(err){
                if(err){ return next(err); }
                res.redirect(piano.url);
            })
        }
    }
];

// Petición para ELIMINAR piano, GET
exports.piano_remove_get = function(req, res, next){
    Piano.findById(req.params.id).exec(function(err, piano){
        if(err){ return next(err); }
        if(piano === null){
            res.redirect('/category/pianos');
            return;
        }
        res.render('piano_remove', {
            title: 'Delete piano',
            piano: piano,
        });
    });
};

// Petición para ELIMINAR piano, POST
exports.piano_remove_post = function(req, res, next){
    Piano.findByIdAndRemove(req.body.pianoid, function deletePiano(err){
        if(err){ return next(err); }
        res.redirect('/category/pianos');
    });
};

// Petición para actualizar piano, GET
exports.piano_update_get = function(req, res, next){
    async.parallel({
        brands(callback){
            Brand.find(callback);
        },
        types(callback){
            Type.find(callback);
        },
        piano(callback){
            Piano.findById(req.params.id).populate('brand').populate('type').exec(callback);
        }
    }, function(err, results){
        if(err){ return next(err) }
        res.render('piano_form', {
            title: "Update Piano",
            brands: results.brands,
            types: results.types,
            piano: results.piano,
        });
    });
};

// Petición para actualizar piano, POST
exports.piano_update_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('type', 'Type must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
    body('stock', 'Stock must be specified').trim().isLength({min: 1}),
    body('brand', 'Brand must be specified').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const piano = new Piano({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            number_in_stock: req.body.stock,
            brand: req.body.brand,
            _id: req.params.id,
        });

        if(!errors.isEmpty()){
            async.parallel({
                brands(callback){
                    Brand.find(callback);
                },
                types(callback){
                    Type.find(callback);
                },
                piano(callback){
                    Piano.findById(req.params.id).exec(callback);
                }
            }, function(err, piano){
                if(err){ return next(err) }
                res.render('piano_form', {
                    title: "Create Piano",
                    brands: results.brands,
                    types: results.types,
                    piano: piano, 
                    errors: errors.array(),
                });
            });
        } else {
            Piano.findByIdAndUpdate(req.params.id, piano, {}, function(err, upPiano){
                if(err){ return next(err); }
                res.redirect(upPiano.url);
            })
        }
    }
];

// Petición para mostrar un solo piano, GET
exports.piano_detail_get = function(req, res, next){
    Piano.findById(req.params.id).populate('brand').populate('type').exec(function(err, piano){
        if(err){ return next(err) }
        if(piano === null){
            let err = new Error('Piano not found.');
            err.status=404;
            return next(err);
        }
        res.render('piano_detail', {
            title: piano.name,
            piano: piano,
        })
    })
}