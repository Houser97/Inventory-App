const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const violinSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true},
    type: {type: Schema.Types.ObjectId, required: true, ref: "Type"},
    price: {type: Number, required: true},
    number_in_stock: {type: Number},
    brand: {type: Schema.Types.ObjectId, required: true, ref: "Brand"}
});

violinSchema.virtual('url').get(function(){
    return '/category/violins/' + this._id;
})

module.exports = mongoose.model('Violin', violinSchema);