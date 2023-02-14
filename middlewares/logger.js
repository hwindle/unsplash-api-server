const loggerMiddleWare = (req, res, next) => {
  const date = new Date().toLocaleDateString();
  console.log(`Logged date: ${date}, method: ${req.method}`);
  next();
};

module.exports = loggerMiddleWare;