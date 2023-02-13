const axios = require('axios');
require('dotenv').config();

class Photo {
  constructor(oneImageObj) {
    const { user: name, urls, description } = oneImageObj;
    this.name = name.name;
    this.imageUrl = urls.regular;
    this.description = description;
  }
}

const photoHandler = async (req, res) => {
  // get query parameter title
  const title = req.query.title;
  const key = process.env.UNSPLASH_API_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${title}&client_id=${key}`;
  //console.log(url);
  try {
    // can also add following to headers: ('Authorization', `Client-ID ${process.env.UNSPLASH_API_KEY}`)
    await axios
      .get(url)
      .then((imgData) => {
        // console.dir(imgData);
        const catArray = imgData.data.results.map((cat) => new Photo(cat));
        return res.status(200).send(catArray);
      })
      .catch((err) => console.log(err));
  } catch {
    res.status(500).send('API fetching problem');
  }
};

const randomPicHandler = async (req, res) => {
  const key = process.env.UNSPLASH_API_KEY;
  const url = `https://api.unsplash.com/photos/random?client_id=${key}`;

  try {
    await axios.get(url).then(randomData => {
      // console.dir(randomData);
      const photoObject = new Photo(randomData.data);
      return res.status(200).send(photoObject);
    }).catch((err) => console.log(err));
  } catch {
    res.status(500).send('API fetching problem');
  }
};

module.exports = { photoHandler, randomPicHandler };
