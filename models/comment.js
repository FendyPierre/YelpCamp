
var mongoose = require("mongoose");

//schema setup
var commentSchema = new mongoose.Schema({
    text: String,
    auther: String,
});

Comment =  mongoose.model("Comment", commentSchema);

module.exports = Comment;
