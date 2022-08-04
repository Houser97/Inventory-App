const Brand = require('../models/brand');

const async = require('async');

// Petición para crear una nueva Brand, GET
exports.brand_create_get = function(req, res, next){
    res.render("brand_form", {
        title: "Create Brand",
    })
};

// Petición para crear una nueva Brand, POST
exports.brand_create_post = [
    
];