const serverError = (req, res) => {
  res.status(500).send('500: Server error encountered.');
};

module.exports = serverError;