const mail = require('nodemailer');

const transporter = mail.createTransport({
    host: 'mail.team71.xyz', // Replace with your cPanel email host
    port: 587, // Replace with your cPanel email port (usually 465 or 587)
    secure: false, // Use TLS encryption
    auth: {
    user: 'noreply@team71.xyz', // Replace with your cPanel email username
    pass: 'Rmtomal10@' // Replace with your cPanel email password
  },
  tls: {
    rejectUnauthorized: false, // Disable certificate validation for self-signed certificates
  },
})

module.exports = transporter;