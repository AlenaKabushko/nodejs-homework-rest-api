const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_API_KEY, EMAIL_FROM } = process.env


const sendEmail = async (email, verificationToken) => {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log(email, EMAIL_FROM,'work email')
    const msg = {
        to: email,
        from: EMAIL_FROM,
        subject: 'Verification',
        html: `<p>Please follow the link for verification</p>
            <a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification</a>`,
        text: `http://localhost:3000/api/users/verify/${verificationToken}`,
    }

    try {
        await sgMail.send(msg)
    } catch (error) {
        console.error(error.response.body);
        return false;
    }

    return true;
}

module.exports = {sendEmail}