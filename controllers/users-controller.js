const usersController = () => {
  const userSignup = (req, res) => {
    res.send('Create new user');
  };

  return { userSignup };
};

module.exports = usersController;
