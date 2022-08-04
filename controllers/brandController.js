const Brand = require('../models/brand');

const async = require('async');

const {body, validationResult} = require('express-validator');

// Petición para crear una nueva Brand, GET
exports.brand_create_get = function(req, res, next){
    res.render("brand_form", {
        title: "Create Brand",
    })
};

// Petición para crear una nueva Brand, POST
exports.brand_create_post = [
    body('name', 'Name must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 3}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const brand = new Brand({
            name: req.body.name,
            description: req.body.description,
        });

        if(!errors.isEmpty()){
            res.render("brand_form", {
                title: "Create Brand",
                brand: brand,
                errors: errors.array(),
            })
            return;
        } else {
            brand.save(function(err){
                if(err){ return next(err) }
                res.redirect('/')
            })
        }
    }
];