const express = require('express');
const path = require('path');
const app = express();
const morgan = require("morgan");
const parseString = require('xml2js').parseString;
const axios = require("axios");

const fetchXml = async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch(e) {
    return e
  }
}

const parseReponse = items => {
  return items.map(function(i) {
    return {
      title: i.title[0],
      description: i.description[0],
      image: i.image[0].url[0],
      url: i.link[0]
    }
  })
}

const newsXml = "https://www.news.com.au/content-feeds/latest-news-technology/"

app.get('/api/news', async (req, res) => {
  try {
    var news = await fetchXml(newsXml)
    parseString(news, function(err, result) {
      const items = parseReponse(result.rss.channel[0].item)
      res.json(items)
    })
  } catch (e) {
    res.json({})
  }
});

app.use(morgan('dev'));
app.listen(process.env.PORT || 3000);
