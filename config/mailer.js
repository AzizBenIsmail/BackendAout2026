const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'medaziz.benismail@gmail.com',
    pass: (process.env.SMTP_PASSWORD || process.env.Api_Key_Gmail || '').replace(/\s+/g, '')
  }
});

module.exports.sendVerificationEmail = async (email, token) => {
  const sender = process.env.SMTP_FROM || process.env.SMTP_USER || 'medaziz.benismail@gmail.com';
  const verificationUrl = `${process.env.APP_URL || 'http://localhost:5000'}/users/verify-email/${token}`;

  await transporter.sendMail({
    from: sender,
    to: email,
    subject: 'Verification de votre adresse e-mail',
    text: `Cliquez sur le lien pour verifier votre adresse e-mail : ${verificationUrl}`,
    html: `<p>Cliquez sur le lien suivant pour verifier votre adresse e-mail :</p><p><a href="${verificationUrl}">Verifier mon adresse e-mail</a></p><p>Ce lien expire dans une heure.</p>`
  });
};
