var express = require("express");
app = express();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing")
});

app.listen(3000, function () {
    console.log("Server has started!");
});