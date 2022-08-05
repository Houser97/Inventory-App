const Guitar = require('../models/guitar');
const Brand = require('../models/brand');
const Type = require('../models/type');
const async = require('async');

const { body, validationResult } = require('express-validator');

// Petición para crear nueva guitarra, GET
exports.guitar_create_get = function(req, res, next){
    async.parallel({
        types(callback){
            Type.find(callback);
        },
        brands(callback){
            Brand.find(callback);
        },
    }, function(err, results){
        if(err){return next(err);}
        res.render('guitar_form', {
            title: "Create Guitar",
            types: results.types,
            brands: results.brands,
        })
    })
}

// Petición para crear nueva guitarra, POST
exports.guitar_create_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('type', 'Type must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
    body('stock', 'Stock must be specified').trim().isLength({min: 1}),
    body('brand', 'Brand must be specified').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const guitar = new Guitar({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            price: req.body.price,
            number_in_stock: req.body.stock,
            brand: req.body.brand,
        });

        if(!errors.isEmpty()){
            async.parallel({
                types(callback){
                    Type.find(callback);
                },
                brands(callback){
                    Brand.find(callback);
                }
            }, function(err, results){
                if(err){return next(err)}
                res.render('guitar_form', {
                    title: 'Create Guitar',
                    guitar: guitar,
                    errors: errors.array(),
                    types: results.types,
                    brands: results.brands,
                });
                return;
            })
        } else {
            // Se comprueba que la guitarra no exista ya.
            Guitar.findOne({name: req.body.name}).exec(function(err, found_guitar){
                if(err){return next(err)}
                if(found_guitar){
                    res.redirect('/');
                } else {
                    guitar.save(function(err){
                        if(err){return next(err);}
                        res.redirect('/');
                    })
                }
            })
        }
    }
];

// Petición para eliminar guitarra, GET
exports.guitar_remove_get = function(req, res, next){
    Guitar.findById(req.params.id).exec(function(err, guitar){
        if(err){ return next(err); }
        if(guitar === null){
            res.redirect("/category/guitars");
        } else {
            res.render('guitar_remove', {
                title: 'Delete Guitar',
                guitar: guitar,
            })
        }
    });
}

// Petición para eliminar guitarra, POST
exports.guitar_remove_post = function(req, res, next){
    Guitar.findByIdAndRemove(req.body.guitarid, function deleteGuitar(err){
        if(err) { return next(err); }
        res.redirect('/category/guitars');
    })
}

// Petición para eliminar guitarra, GET
exports.guitar_update_get = function(req, res, next){
    async.parallel({
        types(callback){
            Type.find(callback);
        },
        brands(callback){
            Brand.find(callback);
        },
        guitar(callback){
            Guitar.findById(req.params.id).populate('brand').populate('type').exec(callback);
        }
    }, function(err, results){
        if(err){ return next(err); }
        if(results.guitar === null){
            let err = new Error('Guitar not found');
            err.status = 404;
            return next(err);
        }
        //Success, se abre el formulario
        res.render('guitar_form', {
            title: 'Update Guitar',
            guitar: results.guitar,
            types: results.types,
            brands: results.brands,
        })
    })
}