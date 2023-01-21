const AdminInvitationTemplate = (
  adminEmail,
  token
) => {
  return {
    from: 'owencoogan01@gmail.com',
    to: adminEmail,
    subject: 'Invitation to join Crece en Libertad',
    html: `
      <h1>Invitation to join Crece en Libertad</h1>
      <p>Hi ${adminEmail},</p>
      <p>You have been invited to join Crece en Libertad as an admin.</p>
      <p>Click the link below to join Crece en Libertad.</p>
      <a href="http://localhost:3000/register/${adminEmail}/${token}">Join Crece en Libertad</a>
      <p>Best regards,</p>
      <p>Crece en Libertad Team</p>
    `,
}}

module.exports = {
  AdminInvitationTemplate
}
