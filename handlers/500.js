const serverError = (error, req, res, next) => {
  console.error(error);
  res.status(500).send({
    code: 500,
    route: req.path, 
    message: `Server problem: (${error.message || error})`,
  });
};

module.exports = serverError;