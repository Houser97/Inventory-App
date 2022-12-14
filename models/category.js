const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true, maxLength: 100},
}, {collection: "category"});

module.exports = mongoose.model("category", categorySchema);