function NotFoundRoute(req, res, next) {
  res.status(404).json({
    status: 404,
    success: false,
    message: "Route Not Found",
  });
}
function ExpressErrorHandler(Error, req, res, next) {
  const status = Error?.status || 500;
  const message = Error?.message || "Internal server Errors";
  return res.status(status).json({
    status,
    success: false,
    message,
  });
}
module.exports = { NotFoundRoute, ExpressErrorHandler };
