const { Comment } = require('../../models');

const createOne = async (req, res) => {
  const { content, userId,postId } = req.body;
  console.log(req.body);

  const newComment = await Comment.create({
    content: content,
    userId: userId,
    postId: postId
  });

  res.status(201).json(newComment);
};

module.exports = {
  createOne
};
