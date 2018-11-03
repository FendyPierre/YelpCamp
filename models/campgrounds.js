
var mongoose = require("mongoose");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

Campground =  mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
