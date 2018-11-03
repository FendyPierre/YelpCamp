
var mongoose = require("mongoose");

//schema setup
var userSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

User =  mongoose.model("User", userSchema);

module.exports = User;
