const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pianoSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true, maxLength: 100},
    type: {type: Schema.Types.ObjectId, required: true, ref: "Type"},
    price: {type: Number, required: true},
    number_in_stock: {type: Number},
    brand: {type: Schema.Types.ObjectId, required: true, ref: "Brand"}
})

//Propiedades Virtuales
pianoSchema.virtual("url").get(function(){
    return "/category/pianos" + this._id;
})

module.exports = mongoose.model("Piano", pianoSchema);