const errorHandler = async (error, req, res, next) => {
  if (error.message === 'jwt expired') {
    res.send({ message: 'session exipred please login in again' });
  }
  if (error.code === 11000) {
    res.status(403);
    res.send({ message: 'user already exist' });
  }
  res.status(error.status || 500);
  res.send({ success: false, message: error.message });
};

module.exports = errorHandler;
