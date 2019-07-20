const express = require('express');
const router = express.Router();
const scrapeController = require('./../controllers/scrapeController')

// Routes:

router.route('/scrape')
    .get(scrapeController.scrape)
  
router.route('/articles')
    .get(scrapeController.articles)
  
router.route('/articles/:id')
    .get(scrapeController.articleId)
    .post(scrapeController.articleIdPost)


module.exports = router;