const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
})

typeSchema.virtual('url').get(function(){
    return "/category/types" + this._id;
})

module.exports = mongoose.model("Type", typeSchema);