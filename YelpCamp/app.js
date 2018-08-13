var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/yelpCamp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");                  //Allows us to leave out .ejs at the end of res.render pageName.ejs
app.use(express.static(__dirname+ "/public"));  //__dirname refers to the directory that this script was running
seedDB();
//Home Page
app.get("/",function(req,res){
    res.render("home.ejs");
});
//GET: Campgrounds Page - (INDEX) campgrounds
app.get("/campgrounds", function(req,res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds}); //{name: data} name can be anything, data must be allCampgrounds
        }
    });
});
//POST: Campgrounds Page (CREATE) - Where you can create a new campground ...
app.post("/campgrounds",function(req,res){
    // Get data from form and add to campgrounds array
    var name = req.body.name;  
    var image = req.body.image;
    var desc = req.body.description;   
    var newCampground = {name: name, image: image, description: desc}; //{name: data}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");   // Redirect back to campgrounds page as a GET request
        }
    });
});

//GET: Campgrounds/New Page (NEW) - Shows form that will send data to POST route
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new.ejs");
});

//GET: Single Campgrounds Page (SHOW) - Render will show more info about one campground
//Note: Must be placed at bottom, otherwise campgrounds/[...] will trigger this page.
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
// ======================
// Comments Routes
// ======================
//GET: Comments (NEW route) - Shows form that will send data to POST route
app.get("/campgrounds/:id/comments/new", function(req,res){
    // Find Campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new.ejs", {campground: campground});
        }
    });
});
//POST: Comments (CREATE route) - Add new comment to DB
app.post("/campgrounds/:id/comments", function(req, res){
    //Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            //Create a new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    //Connect a new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //Redirect campground show page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });   
});


//Error Page
//Note: Must be placed at the bottom otherwise all links after /[...] will trigger an error
app.get("/*",function(req,res){
    res.send("Error: Response Failed.");
});
///Start Listen
app.listen(5500,function(){
    console.log("Server has Started");
    console.log("Go to 'localhost:5500'");
});