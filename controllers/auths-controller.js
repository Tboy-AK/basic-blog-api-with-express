const jwt = require('jsonwebtoken');
const { verifyHash } = require('../utils/hash-handler');

const authsController = (errResponse, UserModel) => {
  // controller to sign user in
  const userSignin = async (req, res) => {
    const reqData = req.body;

    return UserModel.select('*')
      .then((results) => {
        if (results.length === 0) return errResponse(res, 401);
        const result = results[0];
        if (!verifyHash(reqData.password, result.password)) return errResponse(res, 401, 'Invalid credentials');
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
      })
      .catch((err) => {
        console.error(err);
        return errResponse(res, 500, err.message);
      });
  };

  const changeUserPassword = (req, res) => {
    res.send('Successfully changed password');
  };

  return { userSignin, changeUserPassword };
};

module.exports = authsController;
