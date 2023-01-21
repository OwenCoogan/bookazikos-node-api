const { Post,User,userActivity,Comment,AdminInvitation } = require('../../models');

const getAdminData = async (req, res) => {
    const numberOfPosts = await Post.count({});
    const numberOfUsers = await User.count({});
    const adminInvitationsPending = await AdminInvitation.count({
        where: { validated: false }
    })
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
        adminInvitationsPending
      },
      err: null
    }));
}

module.exports = {
  getAdminData
}
