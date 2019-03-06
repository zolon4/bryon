const express = require('express');
const path = require('path');
const app = express();
const morgan = require("morgan");
const parseString = require('xml2js').parseString;
const modules = require("./modules")

const newsXml = "https://www.news.com.au/content-feeds/latest-news-technology/"


app.get('/', (req, res) => {
  res.send("do you come from the land down unda?")
})

app.get('/api/news', async (req, res) => {
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

app.use(morgan('dev'));
app.listen(process.env.PORT || 3000);
