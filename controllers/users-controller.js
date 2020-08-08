const { generateHash } = require('../utils/hash-handler');

const usersController = (errResponse, UserModel) => {
  const getAllUsers = (req, res) => {
    UserModel.find({}, (err, result) => {
      if (err) errResponse(res, 500, err.message);
      else res.json(result);
    });
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
      email: reqData.email,
      password: passwordHash,
    };
    const newUser = new UserModel(user);
    newUser.save((err, result) => {
      if (err) {
        switch (err.code) {
          case 11000:
            errResponse(res, 403, 'User already exists');
            break;

          default:
            errResponse(res, 500, err.message);
            break;
        }
      } else res.status(201).json(result);
    });
  };

  return { userSignup, getAllUsers };
};

module.exports = usersController;
