const ValidateAccountCreation = (
  adminEmail,
  token
) => {
  return {
    from: 'owencoogan01@gmail.com',
    to: adminEmail,
    subject: 'Validate your Crece en Libertad Admin Account',
    html: `
      <p>Hi ${adminEmail},</p>
      <p>You have been invited to join Crece en Libertad as an admin.</p>
      <p>Click the link below to validate your account.</p>
      <a href="http://localhost:3000/login?email=${adminEmail}&${token}">Validate your account</a>
    `,
}}

module.exports = {
  ValidateAccountCreation
}
