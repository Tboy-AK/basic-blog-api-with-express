const { generateHash } = require('../utils/hash-handler');

const usersController = (errResponse, UserModel) => {
  const getAllUsers = (req, res) => {
    UserModel.select('*')
      .then((result) => {
        console.log('get all');
        res.json(result);
      })
      .catch((err) => errResponse(res, 500, err.message));
  };

  const userSignup = async (req, res) => {
    const reqData = req.body;
    let passwordHash;
    try {
      passwordHash = await generateHash(reqData.password);
    } catch (err) {
      return errResponse(res, 400, err.message);
    }
    const user = {
      ...reqData,
      password: passwordHash,
    };
    return UserModel.insert(user, '*')
      .then((result) => res.status(201).json(result))
      .catch((err) => {
        switch (err.code) {
          case '23505':
            console.error(err);
            return errResponse(res, 403, 'User already exists');

          default:
            console.error(err);
            return errResponse(res, 500, err.message);
        }
      });
  };

  return { userSignup, getAllUsers };
};

module.exports = usersController;
