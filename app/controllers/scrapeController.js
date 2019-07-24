// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');


// Require all models
const db = require("./../models");

const scrapeController = {
    scrape: (req, res) => {
        axios.get("https://www.sfgate.com/sports/")
        .then(function(response) {
            const $ = cheerio.load(response.data);
      
            $("section.core-package").each(function(i, element) {
                // Save an empty result object
                $(this).find('li.item').each(function(i, element) {      
                    // Add the text and href of every link, and save them as properties of the result object
                    result.title = $(this).find('a').text()          
                    result.link = 'https://www.sfgate.com/sports/' + $(this).find('a').attr('href')

                    db.Article.create(result)
                        .then(function(dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function(err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                })  
            });
            // Send a message to the client
            res.send("Scrape Complete");
        });
    },

    articles: (req, res) => {
        axios.get("/articles", async (req, res) => {
            try {
                const articles = await db.Article.find();
                res.json(articles);
            } catch(e) {
                es.json(e);
            }
        })
    }

    // articleId: (req, res) => {
    //     axios.get("/articles/:id", async (req, res) => {
    //         try {
    //             const oneArticle = await db.Article.findById(req.params.id).populate('note');
    //             res.json(oneArticle);
    //         } catch(e) {
    //             res.json(e);
    //         }
    //     })
    // },

    // articleIdPost: (req, res) => {
    //     axios.post("/articles/:id", async (req, res) => {
    //         const note = new db.Note(req.body);
    //         try {
    //             const newNote = await db.Note.create(note);
    //             const article = await db.Article.findByIdAndUpdate(req.params.id, { $push: { note: newNote._id}}, {new: true}); 
    //             res.json(article)
    //         } catch(e) {
    //             res.json(e);
    //         }
    //     })
    // }

// Anything else?

}

module.exports = scrapeController;