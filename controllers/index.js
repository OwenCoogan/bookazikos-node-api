const Controllers = {
  auth: require('./auth/auth.controller'),
  adminInvitations: require('./auth/invitations/admin-invitation.controller'),
  post: require('./posts/post.controller'),
  team: require('./team/team.controller'),
  comment: require('./comments/comments.controller'),
  data: require('./team/data.controller'),
}
module.exports = Controllers;
//
