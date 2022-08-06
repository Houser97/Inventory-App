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