const nodeMailer = require("nodemailer");

exports.sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "reala7md@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter
    .sendMail({
      ...emailData,
      to:
        process.env.NODE_ENV !== "production"
          ? "reala7md@gmail.com"
          : emailData.to,
    })
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};


// const nodeMailer = require("nodemailer");

// exports.sendEmail = (emailData) => {
//   const transporter = nodeMailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "reala7md@gmail.com",
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   return transporter
//     .sendMail({
//       ...emailData,
//     })
//     .then((info) => console.log(`Message sent: ${info.response}`))
//     .catch((err) => console.log(`Problem sending email: ${err}`));
// };
