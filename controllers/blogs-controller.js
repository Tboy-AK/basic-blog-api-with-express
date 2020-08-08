/* eslint-disable no-underscore-dangle */

const blogsController = (errResponse, BlogModel) => {
  const readArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    if (req.params.blogId) {
      BlogModel.findOne({
        _authorId: uid,
        _id: req.params.blogId,
      }, (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.json(result);
      });
    } else {
      BlogModel.find({ _authorId: uid }, (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.json(result);
      });
    }
  };

  const createArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    const articleRequest = { ...req.body };
    articleRequest._authorId = uid;
    const blog = new BlogModel(articleRequest);
    blog.save((err, result) => {
      if (err) errResponse(res, 500, err.message);
      else res.json(result);
    });
  };

  const updateArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    const reqBody = req.body;
    const article = {
      content: reqBody.content,
      updatedAt: Date.now(),
    };
    BlogModel.findOneAndUpdate(
      {
        _authorId: uid,
        _id: req.params.blogId,
      },
      article,
      {
        new: true,
        useFindAndModify: false,
      },
      (err, result) => {
        if (err) errResponse(res, 500, err.message);
        else res.status(201).json(result);
      },
    );
  };

  const deleteArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    BlogModel.findOneAndDelete({
      _authorId: uid,
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
