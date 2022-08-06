const Violin = require('../models/violin');
const Brand = require('../models/brand');
const Type = require('../models/type');

const async = require('async');
const { body ,validationResult } = require('express-validator');

// Petición para CREAR violin, GET
exports.violin_create_get = function(req, res, next){
    async.parallel({
        brands(callback){
            Brand.find(callback);
        },
        types(callback){
            Type.find(callback);
        },
    }, function(err, results){
        if(err){ return next(err); }
        res.render('violin_form', {
            title: "Create Violin",
            brands: results.brands,
            types: results.types,
        });
    });
};

// Petición para CREAR violin, POST
exports.violin_create_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('type', 'Type must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
    body('stock', 'Stock must be specified').trim().isLength({min: 1}),
    body('brand', 'Brand must be specified').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const violin = new Violin({
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
                res.render("violin_form", {
                    title: "Create Violin",
                    violin: violin,
                    brands:results.brands,
                    types: results.types,
                    errors: errors.array(),
                });
                return;
            })
        } else {
            violin.save(function(err){
                if(err){ return next(err); }
                res.redirect(violin.url);
            })
        }
    }
];

// Petición para ELIMINAR violin, GET
exports.violin_remove_get = function(req, res, next){
    violin.findById(req.params.id).exec(function(err, violin){
        if(err){ return next(err); }
        if(violin === null){
            res.redirect('/category/violins');
            return;
        }
        res.render('violin_remove', {
            title: 'Delete Violin',
            violin: violin,
        });
    });
};

// Petición para ELIMINAR violin, POST
exports.violin_remove_post = function(req, res, next){
    Violin.findByIdAndRemove(req.body.violinid, function deleteviolin(err){
        if(err){ return next(err); }
        res.redirect('/category/violins');
    });
};

// Petición para actualizar violin, GET
exports.violin_update_get = function(req, res, next){
    async.parallel({
        brands(callback){
            Brand.find(callback);
        },
        types(callback){
            Type.find(callback);
        },
        violin(callback){
            Violin.findById(req.params.id).populate('brand').populate('type').exec(callback);
        }
    }, function(err, results){
        if(err){ return next(err) }
        res.render('violin_form', {
            title: "Update Violin",
            brands: results.brands,
            types: results.types,
            violin: results.violin,
        });
    });
};

// Petición para actualizar violin, POST
exports.violin_update_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 1}).escape(),
    body('type', 'Type must not be empty').trim().isLength({min: 1}).escape(),
    body('price', 'Price must not be empty').trim().isLength({min: 1}).escape(),
    body('stock', 'Stock must be specified').trim().isLength({min: 1}),
    body('brand', 'Brand must be specified').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const violin = new Violin({
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
                violin(callback){
                    Violin.findById(req.params.id).exec(callback);
                }
            }, function(err, violin){
                if(err){ return next(err) }
                res.render('violin_form', {
                    title: "Create Violin",
                    brands: results.brands,
                    types: results.types,
                    violin: violin, 
                    errors: errors.array(),
                });
            });
        } else {
            Violin.findByIdAndUpdate(req.params.id, violin, {}, function(err, upviolin){
                if(err){ return next(err); }
                res.redirect(upviolin.url);
            })
        }
    }
];

// Petición para mostrar un solo violin, GET
exports.violin_detail_get = function(req, res, next){
    Violin.findById(req.params.id).populate('brand').populate('type').exec(function(err, violin){
        if(err){ return next(err) }
        if(violin === null){
            let err = new Error('violin not found.');
            err.status=404;
            return next(err);
        }
        res.render('violin_detail', {
            title: violin.name,
            violin: violin,
        })
    })
}