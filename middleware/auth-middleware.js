const { verify, TokenExpiredError } = require('jsonwebtoken');

const authMiddleware = (errResponse) => {
  const verifyUserAccess = (req, res, next) => {
    const tokenOptions = {
      algorithms: ['HS256'], audience: 'user', issuer: 'SUA',
    };
    try {
      const payload = verify(req.headers.authorization, process.env.ACCESS_SECRET, tokenOptions);
      req.headers.userAccessPayload = payload;
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) errResponse(res, 403, 'Session expired');
      else errResponse(res, 401);
    }
  };
  return verifyUserAccess;
};

module.exports = authMiddleware;
