const errorResponse = (res, statusCode, message, errorCode = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errorCode,
  });
};

const successResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = {
  errorResponse,
  successResponse,
};
