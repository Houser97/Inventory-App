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