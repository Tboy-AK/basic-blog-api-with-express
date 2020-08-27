/* eslint-disable no-underscore-dangle */

const blogsController = (errResponse, BlogModel) => {
  const readArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    console.log(uid, req.body.content);
    if (req.params.blogId) {
      return BlogModel.findOne({
        where: {
          authorId: uid,
          id: req.params.blogId,
        },
      })
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((err) => {
          console.error(err);
          errResponse(res, 500, err.message);
        });
    }
    return BlogModel.findAll({ where: { authorId: uid } })
      .then((results) => {
        console.log('all my blogs');
        res.json(results);
      })
      .catch((err) => {
        console.error(err);
        errResponse(res, 500, err.message);
      });
  };

  const createArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    const articleRequest = { ...req.body };
    articleRequest.authorId = uid;
    return BlogModel.create(articleRequest, { fields: ['content'] })
      .then((results) => {
        const result = results[0];
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        errResponse(res, 500, err.message);
      });
  };

  const updateArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    const reqBody = req.body;
    const article = {
      content: reqBody.content,
    };
    return BlogModel
      .update(article, '*')
      .where({
        authorId: uid,
        _id: req.params.blogId,
      })
      .then((results) => {
        const result = results[0];
        res.status(201).json(result);
      })
      .catch((err) => {
        console.error(err);
        errResponse(res, 500, err.message);
      });
  };

  const deleteArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    return BlogModel
      .del()
      .where({
        authorId: uid,
        _id: req.params.blogId,
      })
      .then(() => res.send('Article successfully deleted'))
      .catch((err) => {
        console.error(err);
        errResponse(res, 500, err.message);
      });
  };

  return {
    readArticle, createArticle, updateArticle, deleteArticle,
  };
};

module.exports = blogsController;
