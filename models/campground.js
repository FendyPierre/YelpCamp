
var mongoose = require("mongoose"),
    Comment = require("./comment");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

Campground =  mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
