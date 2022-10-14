const { Comment } = require('../../models');

const createOne = async (req, res) => {
  const { comment, userId,postId } = req.body;

  const newComment = await Comment.create({
    content: comment,
    userId: userId,
    postId: postId
  });

  res.status(201).json(newComment);
};

module.exports = {
  createOne
};
