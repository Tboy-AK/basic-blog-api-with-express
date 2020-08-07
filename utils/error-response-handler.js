module.exports = (res, status = 500, message) => {
  let errMessage;
  if (message == null) {
    switch (status) {
      case 400:
        errMessage = 'User request error';
        break;
      case 401:
        errMessage = 'User not recognized';
        break;
      case 403:
        errMessage = 'Access denied';
        break;
      case 404:
        errMessage = 'Resource not found';
        break;
      case 422:
        errMessage = 'Invalid user input';
        break;
      default:
        errMessage = 'Internal server error';
        break;
    }
  } else {
    errMessage = message;
  }
  return res.status(status).send(errMessage);
};
