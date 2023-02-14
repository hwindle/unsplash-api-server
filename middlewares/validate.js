const validate = (req, res, next) => {
  // matches [A-Za-z] from 2 - 15 characters long
  // no spaces, dashes or numbers
  const regex = /\w{2,15}/;
  const titleGetParam = req.query.title;
  if (!titleGetParam || !regex.test(titleGetParam)) {
    next('The title argument must be a-z and between 2 - 15 characters long');
  } else {
    next();
  }
};

module.exports = validate;