const { AdminInvitationTemplate } = require("../../../config/email-transporter/email-templates/AdminInvitation");
const { AdminInvitation } = require('../../../models');
const jwt = require('jsonwebtoken');

const { transporter } = require('../../../config/email-transporter/email-transporter');
const { User } = require('../../../models');


const getPendingInvitations = async (req, res) => {
  await AdminInvitation.findAll({
    where: {
      validated: false
    }
  })
  .then( apiResponse => res.json( { data: apiResponse, err: null } ))
  .catch( apiError => res.json( { data: null, err: apiError } ))
}

const createAdminInvitation = async (req, res) => {
  const existingUser = await User.findOne({
    where: { email: req.body.email }
  });
  const existingInvitation = await AdminInvitation.findOne({
    where: { email: req.body.email }
  });
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  if (!existingUser && !existingInvitation) {
    await transporter.sendMail(AdminInvitationTemplate(req.body.email,token), (err, info) => {
      if (err) {
        console.log(err);
        return res.json( { data: null, err: err } )
      } else {
        AdminInvitation.create({
          email: req.body.email,
          token: token,
          validated: false
        })
        .then( apiResponse => res.json( { data: apiResponse, err: null } ))
      }
    })
  }
  else {
    return res.json({
      errorCode: 'User already exists or invitation already sent'
    });
  }
};

const validateAdminInvitation = async (req, res) => {
  console.log(req.body)
  const existingInvitation = await AdminInvitation.findOne({
    where: {
      email : req.body.email,
      token: req.body.token
    }
  })
  console.log(existingInvitation)
  if (existingInvitation) {
    return res.json({
      invitationId: existingInvitation.id,
    });
  }
  else {
    return res.json({
      errorCode: 'Invitation not valid'
    });
  }
};

module.exports = {
  createAdminInvitation,
  validateAdminInvitation,
  getPendingInvitations
}
