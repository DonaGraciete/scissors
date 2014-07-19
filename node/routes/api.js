var express = require('express');
var router = express.Router();

router.post("/login",function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    var db = req.db;
       
    db.authenticate(username,password,function(err,result){
        console.log("result: "+result);
        res.json({result:result});
    });
});


router.post("/register",function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    
    var db = req.db;
    
    db.collection("system.users").findOne({user:username},function(err,result){
        if(!result){
            db.addUser(username,password,function(err,result){
                res.json({result:true});
            });
        } 
        else
            res.json({result:false});
    });
});

/*
router.get('/collections', function(req, res) {
    req.db.driver.collectionNames(function(err,names){
        res.json(names);
    });
});

router.post("/messages",function(req,res){
    //Set internal DB variable
    var db = req.db;

    //Get submission values
    var text = req.body.text;

    //Set collection
    var messages = db.get("messages");

    //Insert to DB
    messages.update({user:"gay"},{text:text},{upsert:true})
        .error(function(err){
            res.send("There was a problem adding your information to the database");
        })
        .success(function(){
            res.send("Post successful!");
        });
});

router.get("/messages",function(req,res){

    var db = req.db;

    var messages = db.get("messages");

    messages.findOne({user:"gay"},function(err,docs){
        res.json(docs);
    });
});

*/
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
