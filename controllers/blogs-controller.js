/* eslint-disable no-underscore-dangle */

const blogsController = (errResponse, BlogModel) => {
  const readArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    if (req.params.blogId) {
      return BlogModel
        .select('*')
        .where({
          auth_id: uid,
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
    }
    return BlogModel
      .select('*')
      .where({ auth_id: uid })
      .then((result) => res.json(result))
      .catch((err) => {
        console.error(err);
        errResponse(res, 500, err.message);
      });
  };

  const createArticle = (req, res) => {
    const { uid } = req.headers.userAccessPayload;
    const articleRequest = { ...req.body };
    articleRequest.auth_id = uid;
    return BlogModel
      .insert(articleRequest, '*')
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
        auth_id: uid,
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
        auth_id: uid,
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
