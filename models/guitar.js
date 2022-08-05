const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guitarSchema = new Schema({
    name: {type: String, required:true, maxLength: 100},
    description: {type: String, required: true, maxLength: 500},
    type: {type: Schema.Types.ObjectId, ref: "Type", required: true},
    price: {type: Number, required: true},
    number_in_stock: {type: Number},
    brand: {type: Schema.Types.ObjectId, ref: "Brand", required: true},
})

//Propiedades virtuales
guitarSchema.virtual('url').get(function(){
    return '/category/guitars/' + this._id;
})

module.exports = mongoose.model("Guitar", guitarSchema);