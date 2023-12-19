const mailconfig = require('./emailconfig')

let emailsend = async function sendMailToUser(email, body) {
  console.log(email);
  console.log(body);
    try {
        const emailsuccess = await mailconfig.sendMail({
          from: 'noreply@team71.xyz', // Replace with your cPanel email address
          to: email, // Replace with the recipient's email address
          subject: "Email Verification",
          text: body
        });


    
        console.log(emailsuccess);
      } catch (error) {
        console.error(error);
        //res.status(500).send({ message: 'Error sending email' });
      }
}
module.exports = {
  emailsend
}