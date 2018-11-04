var mongoose = require("mongoose");
    Campgrounds = require("./models/campground"),
    CommentM = require("./models/comment");



var data = [
    {
        name: "First",
        image: "https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg",
        description: "RAND RTH df gg iosxdvc sdgfirusdui gfadsgf isdv sdlg h vuis gfshdfsdius flig qa sdf uio rgp " },
    {
        name: "second camp",
        image: "https://acadiamagic.com/1170px/blackwoods-1197.jpg",
        description: " dfg egfh tyj sdtrh rfg rthyhrt etrghe hhbreth re jh6yjrehbrewhwe heth gewt hgththgethrth erg ewrgh"
    },
    {
        name: "third camp site",
        image: "https://www.justahead.com/wp-content/uploads/2015/08/madison-campground-11.jpg",
        description: "rqg dfcb dfh trhwseth bt rhsahr y setrtjherdefhbfgeh jrejns bet jhtwh ehbth whetrhdf gfdw ht"
    },
]

var comments = {
          text: "this place is just a bunch of random words tgha rghte asf k jtgeg sdf ",
          auther: "User"
      }

function seedDB(){
    Campgrounds.remove({}, function(err){
        if(err){
            console.log("Failed to delete campgrounds db. Error:" + err);
            return false;
        }
        else{
            CommentM.remove({}, function(err){
                if(err){
                    console.log("Failed to delete campgrounds db. Error:" + err);
                    return false;
                }
                else{
                    CommentM.remove()
                    console.log("successfully deleted Yelp DB");
                    createNewCamps();
                }
            });
        }
    });
}


function createNewCamps() {  
    data.forEach(function(seed){
        Campgrounds.create(seed, function(err, camp){
            if(!err){
                // camp.comments.push(comments);
                console.log("successly created camp:" + camp); 
                createComments(camp);
            }
            else{
                {
                    console.log("Failed to delete campground. Error:" + err);
                }
            }
        });
    });
}


function createComments(camp){
  CommentM.create(comments, function(err, newComment){
    if(!err){
        camp.comments.push(newComment);
        camp.save();
        console.log("successly created new comment:" + newComment);
    }
    else{
            console.log("Failed to create comment. Error:" + err);
        }
  });

}

module.exports = seedDB;