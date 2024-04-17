const nodemailer = require('nodemailer');

async function sendEmail(from, to, subject, htmlContent) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'emonawong22@gmail.com',
            pass: 'nouv heik zbln qkhf',
        },
    });

    try {
        const mailOptions = { from, to, subject, html: htmlContent };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail,
};