const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
// const scrapeController = require('./../controllers/scrapeController')

var db = require("./../models");


// Routes:   /API/ + 

// A GET route for scraping the SFGate/Sports website
router.get("/scrape", function(req, res) {
    axios.get("https://www.sfgate.com/sports/")
    .then(function(response) {
        const $ = cheerio.load(response.data);
        var result = {};
        $("section.core-package").each(function(i, element) {
            $(this).find('li.item').each(function(i, element) {      
                result.title = $(this).find('a').text();
                result.link = 'https://www.sfgate.com/sports/' + $(this).find('a').attr('href');
                db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
            })
        });
    res.redirect('/');
    res.send("Scrape Complete");
    });
});

// Route for getting all Articles from the db
router.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});   
  
// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});
  
// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Route for clearing all articles in db
router.get('/clearAll', (req, res) => {
    db.Article.remove({}, (err, doc) => {
        if (err) {
            console.log(err);
        }else{
            console.log("Removed all articles");
        }
    });
    res.redirect('/');
})


module.exports = router;