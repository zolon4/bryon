const express = require('express');
const path = require('path');
const app = express();
const morgan = require("morgan");
const parseString = require('xml2js').parseString;
const modules = require("./modules")

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/api/news', async (req, res) => {
  const newsXml = "https://www.news.com.au/content-feeds/latest-news-technology/"
  try {
    var news = await modules.fetchXml(newsXml)
    parseString(news, function(err, result) {
      const items = modules.parseResponse(result.rss.channel[0].item)
      res.json(items)
    })
  } catch (e) {
    res.json({})
  }
});

app.listen(process.env.PORT || 3000);
