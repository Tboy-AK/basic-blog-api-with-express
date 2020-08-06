const rootController = () => {
  const apiNavigation = (req, res) => {
    res.send('Welcome to Tboy-AK Blog API');
  };

  return { apiNavigation };
};

module.exports = rootController;
