/* eslint-disable no-underscore-dangle */

const blogsController = (errResponse, BlogModel) => {
  const readArticle = (req, res) => {
    if (req.params.blogId) {
      BlogModel.findOne({
        _authorId: req.headers.authorization,
        _id: req.params.blogId,
      }, (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.json(result);
      });
    } else {
      BlogModel.find({ _authorId: req.headers.authorization }, (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.json(result);
      });
    }
  };
  const createArticle = (req, res) => {
    const articleRequest = { ...req.body };
    articleRequest._authorId = req.headers.authorization;
    const blog = new BlogModel(articleRequest);
    blog.save((err, result) => {
      if (err) errResponse(res, 500, err.message);
      else res.json(result);
    });
  };
  const updateArticle = (req, res) => {
    BlogModel.findOneAndUpdate(
      {
        _authorId: req.headers.authorization,
        _id: req.params.blogId,
      },
      req.body,
      {
        new: true,
        useFindAndModify: false,
      },
      (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.json(result);
      },
    );
  };
  const deleteArticle = (req, res) => {
    BlogModel.findOneAndDelete({
      _authorId: req.headers.authorization,
      _id: req.params.blogId,
    }, (err) => {
      if (err) errResponse(res, 500, err.message);
      else res.send('Article successfully deleted');
    });
  };

  return {
    readArticle, createArticle, updateArticle, deleteArticle,
  };
};

module.exports = blogsController;
