var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var category = Schema({
    name:       {type: String, require: true},
});
module.exports = mongoose.model('Category', quiz);