var express     = require("express");
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

function createCamp(name, image){
    Campground.create(
        {

        name: name, 
        image: image

        }, function(err, camp){
            if(err){
                console.log("failed to create");
                console.log(err);
            }
            else{
                console.log("successfully created");
                console.log(camp);
            }
    });
}

var campgrounds = [
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "salmon Creek", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "Worldstar", image: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
]

app.get("/", function(req, res){
    res.render("landing")
});

app.get("/campgrounds", function(req,res){
    var campgrounds = Campground.find({}, function (err, allCamps) { 
        if(err){
            console.log("failed to create");
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: allCamps});
        }
     })
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")

});

app.post("/campgrounds", function(req,res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;

    //add data to campgrounds
    createCamp(name, image);

    //redirect to campgrounds page
    res.redirect("campgrounds");
});

app.listen(3000, function () {
    console.log("Server has started!");
});