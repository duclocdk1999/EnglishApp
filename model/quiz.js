var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var quiz = Schema({

    time:   {type: String},
    status: {type: String, require: true},

    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    topic: {
        tye: Schema.Types.ObjectId,
        ref: "Topic"
    }
});
module.exports = mongoose.model('Quiz', quiz);