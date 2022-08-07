const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
})

//Propiedades virtuales
brandSchema.virtual('url').get(function(){
    return "/category/brands/" + this._id;
});

module.exports = mongoose.model("Brand", brandSchema);