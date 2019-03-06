const axios = require("axios");

const fetchXml = async url => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch(e) {
    return e
  }
}

const parseResponse = items => {
  return items.map(function(i) {
    return {
      title: i.title[0],
      description: i.description[0],
      image: i.image[0].url[0],
      url: i.link[0]
    }
  })
}

module.exports = {
  fetchXml,
  parseResponse
}
