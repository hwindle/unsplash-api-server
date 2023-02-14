const loggerMiddleWare = (req, res, next) => {
  const date = new Date();
  console.log(`Logged date: ${date}, method: ${req.method}`);
  next();
};

module.exports = loggerMiddleWare;