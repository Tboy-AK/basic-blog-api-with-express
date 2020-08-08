const jwt = require('jsonwebtoken');
const { verifyHash } = require('../utils/hash-handler');

const authsController = (errResponse, UserModel) => {
  // controller to sign user in
  const userSignin = async (req, res) => {
    const reqData = req.body;

    UserModel.findOne({ email: reqData.email }, (err, result) => {
      if (err) errResponse(res, 500, err.message);
      else if (!result) errResponse(res, 401);
      else if (!verifyHash(reqData.password, result.password)) errResponse(res, 401, 'Invalid credentials');
      else {
        const { _id, email } = result;

        // configure user tokens
        const aud = 'user';
        const iss = 'SUA';
        const algorithm = 'HS256';
        const tokenOptions = { algorithm, issuer: iss, audience: aud };
        const accessToken = jwt.sign({
          uid: _id, email, exp: Math.floor(Date.now() / 1000) + (900),
        }, process.env.ACCESS_SECRET, tokenOptions);
        const refreshToken = jwt.sign({
          uid: _id, email, exp: Math.floor(Date.now() / 1000) + (3600 * 24 * 30),
        }, process.env.REFRESH_SECRET, tokenOptions);

        res
          .status(201)
          .header('Authorization', accessToken)
          .cookie('SUA', refreshToken, {
            maxAge: 30 * 24 * 3600000,
            path: '/api/v1/session',
            sameSite: 'none',
            httpOnly: true,
            secure: false,
            domain: process.env.DOMAIN || 'localhost',
          })
          .json({
            message: 'Successfully signed in',
            email: result.email,
            accessExp: 900000,
            refreshExp: 30 * 24 * 3600000,
          });
      }
    });
  };

  return { userSignin };
};

module.exports = authsController;
