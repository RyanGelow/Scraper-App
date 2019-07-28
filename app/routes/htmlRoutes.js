var express = require("express");
var path = require("path");
var db = require("./../models");

var router = express.Router();

// Route:

router.get("/", function(req, res) {
    db.Article.find()
        .then(function(data){
            console.log(data)
            res.render('index', { items: data })
        })
});
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(page) {
            console.log(page)
            res.render('page', { page })
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = router;