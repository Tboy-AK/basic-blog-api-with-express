const usersController = (errResponse, UserModel) => {
  const userSignup = (req, res) => {
    const user = new UserModel(req.body);
    user.save((err, result) => {
      if (err) errResponse(res, 500, err.message);
      else res.json(result);
    });
  };

  return { userSignup };
};

module.exports = usersController;
