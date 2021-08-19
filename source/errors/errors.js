exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'bad request: invalid id type' });
  } else {
    next(err);
  }
};
exports.handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
};

exports.handleBadUrls = (req, res) => {
  res.status(404).send({ msg: 'route not found' });
};
