var express = require("express");
var path = require("path");
var db = require("./../models");

var router = express.Router();

// Route:

router.get("/", function(req, res) {
    db.Article.find().then(function(data){
        console.log(data)
        res.render('index', { items: data })
    })
});

module.exports = router;