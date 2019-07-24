// START YOUR SCRAPING!

const express = require("express");
const logger = require("morgan");
var exphbs  = require('express-handlebars');
const mongoose = require("mongoose");

// Require all models
var db = require("./app/models");

const PORT = process.env.PORT || 3050;

// Initialize Express
const app = express();
 
// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
// app.use(express.static("public"));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
const routes = require('./app/routes');
app.use(routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
