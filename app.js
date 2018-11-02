var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "Worldstar", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
]

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")

});

app.post("/campgrounds", function(req,res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;

    //add data to campgrounds
    var newcamp = {name: name, image: image}
    campgrounds.push(newcamp);

    //redirect to campgrounds page
    res.redirect("campgrounds");
});

app.listen(3000, function () {
    console.log("Server has started!");
});