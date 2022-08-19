//DON'T CHANGE THESE...

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require('lodash');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect('mongodb+srv://rakshit:chitkararakshit@cluster0.q0egtms.mongodb.net/dailyjournalDB');





//SCHEMA

const itemSchema = new mongoose.Schema({
  title: "String",
  content: "String"
});
const Item = mongoose.model("Item", itemSchema);




//GET FUNCTION FOR LANDING PAGE

app.get("/", function(req, res) {
  res.render("landing")
});



//POST FUNCTION WHEN WE COMPOSE A NEW THING

app.post("/compose", function(req, res) {
  const newtitle = req.body.newt;
  const newcont = req.body.newm;
  const newday = new Item({
    title: newtitle,
    content: newcont
  });
  newday.save();
  res.redirect("/home");
});


//GET FUNCTION FOR WHEN HOME IS CALLED

app.get("/home", function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else if (items.length == 0) {
      res.render("landing")
    } else {
      res.render("home", {
        posts: items
      });
    }
  })
});


//POST FUNCTION WHEN SOMEONE CLICKS READ MORE.

app.get("/posts/:specpost", function(req, res) {

  Item.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      for (var i = 0; i < items.length; i++) {
        if (items[i]._id == req.params.specpost) {
          res.render("post", {
            title: items[i].title,
            body: items[i].content,
            id: items[i]._id
          })
        }
      }
    }
  })
});





//POST FUNCTION WHEN SOMEONE CLICKS DELETE.
app.post("/delete", function(req, res) {
  const tbd = req.body.delete;

  Item.deleteOne({
    _id: tbd
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/home");
    }
  })
});







app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact"  );
});

app.get("/compose", function(req, res) {
  res.render("compose");
});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
