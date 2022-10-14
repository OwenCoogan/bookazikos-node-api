const { Comment } = require('../../models');

const createOne = async (req, res) => {
  const { comment, userId } = req.body;

  const newComment = await Comment.create({
    content: comment,
    userId,
  });

  res.status(201).json(newComment);
};

module.exports = {
  createOne
};
