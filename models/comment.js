
var mongoose = require("mongoose");

//schema setup
var commentSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

Comment =  mongoose.model("Comment", commentSchema);

module.exports = Comment;
