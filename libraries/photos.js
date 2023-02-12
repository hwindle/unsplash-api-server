const superagent = require('superagent');
require('dotenv').config();

class Photo {
  constructor(oneImageObj) {
    const {user: name, urls, description} = oneImageObj;
    this.name = name.name;
    this.imageUrl = urls.regular;
    this.description = description;
  }
}


const photoHandler = async (req, res) => {
  // get query parameter title
  const title = req.query.title;
  console.log(title);
  const key = process.env.UNSPLASH_API_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${title}&client_id=${key}`;

  try {
    // can also add to superagent (headers) .set('Authorization', `Client-ID ${process.env.UNSPLASH_API_KEY}`)
    const imgData = await superagent.get(url);
    const catArray = await imgData.results.map((cat) => new Photo(cat));
    res.status(200).send(catArray);
  } catch {
    res.status(500).send('API fetching problem');
  }
};

const randomPicHandler = async (req, res) => {
  const key = process.env.UNSPLASH_API_KEY;
  const url = `https://api.unsplash.com/photos/random?client_id=${key}`;
  console.log('In random pics');
  try {
    const imgData = await superagent.get(url);
    const photoObject = new Photo(imgData);
    res.status(200).send(photoObject);
  } catch {
    res.status(500).send('API fetching problem');
  }
};

module.exports = { photoHandler, randomPicHandler };