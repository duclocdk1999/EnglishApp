var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var category = Schema({
    name:       {type: String, require: true, unique: true},
});
module.exports = mongoose.model('Category', category);