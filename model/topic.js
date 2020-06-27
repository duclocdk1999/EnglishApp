var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var topic = Schema({
    name:       {type: String, require: true, unique: true},
    status:     {type: Boolean, require: true},
    type:       {type: String},
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
});
module.exports = mongoose.model('Topic', quiz);