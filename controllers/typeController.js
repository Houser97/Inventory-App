const Type = require('../models/type');
const { body, validationResult } = require('express-validator');

// Petición para crear type, GET
exports.type_create_get = function(req, res, next){
    res.render('type_form', {
        title: "Create Type"
    });
}

// Petición para crear type, POST
exports.type_create_post = [
    body('type', 'Type must be specified').trim().isLength({min: 3}).escape(),
    body('description', 'Description must not be empty').trim().isLength({min: 3}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        const type = new Type({
            name: req.body.type,
            description: req.body.description,
        });

        if(!errors.isEmpty()){
            res.render('type_form', {
                title: 'Create Type',
                type: type,
                errors: errors.array(),
            });
            return;
        } else {
            type.save(function(err){
                if(err){ return next(err); }
                res.redirect('/')
            });
        }
    }
];

// Obtener información de TYPE específico
exports.type_detail_get = function(req, res, next){
    Type.findById(req.params.id).exec(function(err, type){
        if(err){ return next(err); }
        res.render('brand_type_detail', {
            title: type.name,
            brand_or_type: type,
        });
    });
};
