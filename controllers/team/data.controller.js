const { Post,User,userActivity,Comment } = require('../../models');

const getAdminData = async (req, res) => {
    const numberOfPosts = await Post.count({});
    const numberOfUsers = await User.count({});
    const numberOfDrafts = await Post.count({
        where: { publicationStatus: 'draft' },
    });
    const numberOfComments = await Comment.count({});
    return(res.json({
      data:{
        numberOfPosts,
        numberOfDrafts,
        numberOfUsers,
        numberOfComments,
      },
      err: null
    }));
}

module.exports = {
  getAdminData
}
