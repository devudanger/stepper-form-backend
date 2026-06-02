export const sendSuccess = (
  res,
  data = {},
  message = "Request Successful",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (error, res) => {
  const message = error.message || "SERVER ERROR : Unidentified";
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
