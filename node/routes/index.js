var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
/*
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {userlist : docs});
    });
});*/
/*
router.get("/user",function(req,res){
    var collection = req.db.get('usercollection');
    collection.find({"username":"miguel"},{})
        .success(function(docs){
            res.json(docs);
        });
});*/


router.get("/newuser",function(req,res){
	res.render("newuser",{title:"Add New User"});
});

router.get("/chat",function(req,res){
    res.render("chat",{title:"Chat"});
});

/* POST to Add User Service */
/*
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    })
        .error(function(err){
            res.send("There was a problem adding the information to the database.");
        })
        .success(function(docs){
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        });
});
*/
module.exports = router;
