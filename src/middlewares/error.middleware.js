const notFound = (req, res, next) => {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.APP_PORT;
  const fullUrl = `${protocol}://${host}:${port}${url}`;
  res.status(404).send({
    success: false,
    message: `Route ${fullUrl} Not Found`,
  });
};

const appError = (err, req, res, next) => {
  const errstatus_code = err.status_code || 400;
  const errMessage = err.message || 'Something went wrong';
  res.status(errstatus_code).json({
    status: 'error',
    message: errMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const idNotFound = async (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).send({
      success: false,
      message: 'ID must be an integer',
    });
  }
  next();
};

export { notFound, appError, idNotFound };
