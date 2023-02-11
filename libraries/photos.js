const superagent = require('superagent');


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

  const url = `https://api.unsplash.com/search/photos?page=1&query=${title}`;

  try {
    const imgData = await superagent.get(url).set('Authorization', `Client-ID ${process.env.UNSPLASH_API_KEY}`);
    const catArray = imgData.results.map((cat) => new Photo(cat));
    res.status(200).send(catArray);
  } catch {
    res.status(500).send('API fetching problem');
  }
};

const randomPicHandler = async (req, res) => {
  const url = `https://api.unsplash.com/photos/random`;
  try {
    const imgData = await superagent.get(url).set('Authorization', `Client-ID ${process.env.UNSPLASH_API_KEY}`);
    const photoObject = new Photo(imgData);
    res.status(200).send(photoObject);
  } catch {
    res.status(500).send('API fetching problem');
  }
};

module.exports = { photoHandler, randomPicHandler };