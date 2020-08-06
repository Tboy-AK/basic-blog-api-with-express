const usersController = () => {
  const readArticle = (req, res) => {
    res.send('Read blog');
  };
  const createArticle = (req, res) => {
    res.send('Create new blog');
  };
  const updateArticle = (req, res) => {
    res.send('Update blog');
  };
  const deleteArticle = (req, res) => {
    res.send('Delete blog');
  };

  return {
    readArticle, createArticle, updateArticle, deleteArticle,
  };
};

module.exports = usersController;
