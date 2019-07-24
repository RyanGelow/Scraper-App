var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./app/models/");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Routes

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  // axios.get("http://www.echojs.com/").then(function(response) {
  axios.get("https://www.sfgate.com/sports/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    // $("article h2").each(function(i, element) {
    $("h4 a.hdn-analytics").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", async (req, res) => {
  // TODO: Finish the route so it grabs all of the articles
  try {
    const articles = await db.Article.find();
    res.json(articles);
  } catch(e) {
    res.json(e);
  }
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", async (req, res) => {
  try {
    const oneArticle = await db.Article.findById(req.params.id).populate('note');
    res.json(oneArticle);
  } catch(e) {
    res.json(e);
  }
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", async (req, res) => {
  
  const note = new db.Note(req.body);
  try {
    const newNote = await db.Note.create(note);
    const article = await db.Article.findByIdAndUpdate(req.params.id, { $push: { note: newNote._id}}, {new: true}); 
    res.json(article)
  } catch(e) {
    res.json(e);
  }
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});