# Sports News Scraper App

1. This web application provides a service that scrapes a web site, saves headlines and links to a database, and then allows for people to comment on that that article with those comments also saving to a database. In this instance, this web scraper is returning the latest headlines on SFGate.com/sports on local, relevant sports.  

2. As previously mentioned, this website showcases 3 main features: 

    1. The web scaper, using Cheerio, identifies reoccurring html data that follows a certain syntax. 

    2. The individual articles are then copied one-at-a-time, in parts, and entered into a newly created database. That data is then formated and displayed on the Sports News Scraper website.

    3. Lastly when you click post comment on the news snippit, either on the front page or the individul article's comment page, the comment on that post is saved to a notes database, is linked to that article, and the latest comment post is displayed on the article's individual page. 

This app uses the cheerio and mongoose packages for scraping and updating the database. The backend is also run through Heroku. 

3. How does one use the page?  --When the page opens, you will see instructions in the main body of the screen to guide you. However, if there are no articles, click "Scrape the News" in the nav bar and the page will generate with the latest news headlines. If you want to make sure you have the latest headlines, you can click "Clear Old News" in the navbar and then "Scrape the News" in the navbar to ensure the list is most fresh.

From here, go down the list of articles and click to view their original source or click to leave a comment. You can leave a comment right there on the front end by pressing "Leave a Comment" to open a text form in the same webpage where you can input a comment title and body, and then press "POST" to have it entered into the database. After this the comment can only be viewed by pressing the "Comments" button which leads to another page and just centers on the headline, the latest comment, a place to leave another comment, and also the link to the originally scraped article should you want to read more.   

4. Here are a few photo examples of the Sports News Web Scraper in action:
        ![Pre-Scrape / Post-Clear](https://github.com/RyanGelow/Scraper-App/blob/master/images/starter.png)
        ![After Scrape](https://github.com/RyanGelow/Scraper-App/blob/master/images/scraped.png)
        ![Front Page Note](https://github.com/RyanGelow/Scraper-App/blob/master/images/front-note.png)
        ![Article Page Note Making](https://github.com/RyanGelow/Scraper-App/blob/master/images/page-note-posting.png)
        ![Article Page Note Posted](https://github.com/RyanGelow/Scraper-App/blob/master/images/page-note-posted.png)

5. Link to app: https://github.com/RyanGelow/bamazon

6. Technologies/npm packages used:
    
    * cheerio
    * express
    * axios
    * mongoose
 
7. List of key individuals:
    * Lead-Developer: Ryan Gelow
