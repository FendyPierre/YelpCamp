var express     = require("express");
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


function createCamp(name, image, description){
    Campground.create(
        {

        name: name, 
        image: image,
        description: description

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

function findCamp(id, res){
    Campground.findById(id).populate("comments").exec(
        function(err, camp){
            if(err || camp == null){
                console.log("failed to find camp");
                console.log(err);
                res.redirect("/campgrounds");
            }
            else{
                console.log("successfully found camp" + camp);
                res.render("./campgrounds/show", {campground: camp});
            }
    });
}

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
            res.render("./campgrounds/index", {campgrounds: allCamps});
        }
     })
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("./campgrounds/new")

});

app.post("/campgrounds", function(req,res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    //add data to campgrounds
    createCamp(name, image, description);

    //redirect to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", function (req, res) {
        var id = req.params.id;
        findCamp(id, res);
  })


//comments routes
app.get("/campgrounds/:id/comments/new", function(req, res){
   var id = req.params.id;
    Campground.findById(id, function(err, campground){
        if(!err){
            res.render("./comments/new", {campground: campground});
        }
        else{
             console.log("Unable to load new comment page. Error:" + err);
        }
    })
});

app.post("/campgrounds/:id/comments/", function(req, res){
    var id = req.params.id;
    var comment = req.body.comment;
    Campground.findById(id, function(err, campground){
        if(!err){
            Comment.create(comment, function(err, comment){
                if(!err){
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + id);
                }
            });
        }
        else{
             console.log("Unable to post comment. Error:" + err);
        }
    })

});

app.listen(3000, function () {
    console.log("Server has started!");
});