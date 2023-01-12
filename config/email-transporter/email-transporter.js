const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "owencoogan01@gmail.com", // generated ethereal user
    pass: "rwnuthqffscwllzy", // generated ethereal password
  },
});

module.exports = {
  transporter
}
