var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var account = Schema({
    username:   {type: String, require: true, unique: true},
    password:   {type: String, require: true},
    type:       {type: String, require: false},
    // quizzes: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Quiz"
    //     }
    // ]
});
module.exports = mongoose.model('Account', account);