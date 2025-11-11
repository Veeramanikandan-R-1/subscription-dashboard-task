// generic notFound and error handler
const notFound = (req, res, next) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // if Joi validation error
  if (err.isJoi) {
    return res
      .status(400)
      .json({
        error: "ValidationError",
        details: err.details.map((d) => d.message),
      });
  }
  res.status(status).json({ error: message });
};

module.exports = { notFound, errorHandler };
