const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ba1d4ab5954aad",
      pass: "19e640680d212c"
    }
  });


  module.exports = {
    sendVerificationEmail: async (emailTo, verificationToken) => {
      await transporter.sendMail({
        from: '"MERNPROJECT" <mernproject@test.com>',
        to: emailTo,
        subject: 'Account Verification',
        text: 'Welcome to merndealership project. Please verify your account through the link: http://localhost:3001/verify-account/' + verificationToken,
        html: `<div>
          <b>Welcome to merndealership project. Please verify your account by pressing the button below</b>
          <a href="http://localhost:3001/verify-account/${verificationToken}">Verify Account</a>
        <div>`,
      })
    },

    sendResetPasswordLink: async (emailTo, token) => {
        await transporter.sendMail({
        from: '"MERNPROJECT" <mernproject@test.com>',
          to: emailTo,
          subject: 'Forgot Password?',
          text:
            'Your accont has requested to reset the password. If this was not you please ignore this email. Otherwise, follow the link to reset your passwrod: http://localhost:3001/reset-password/' +
            token,
          html: `<div>
            <p>Your accont has requested to reset the password. If this was not you please ignore this email. Otherwise, press the button below to reset your passwrod</p>
            <a href="http://localhost:3001/reset-password/${token}">Reset Password</a>
            </div>`,
        })
      },
    }