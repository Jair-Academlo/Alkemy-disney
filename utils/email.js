const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const pug = require('pug');
const path = require('path');
const { htmlToText } = require('html-to-text');

dotenv.config({ path: './config.env' });

//created to class email
class Email {
  constructor(to) {
    this.to = to;
  }

  // Connect to mail service
  newTransport() {
    // Connect to SendGrid
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Send the actual mail
  async send(template, subject, mailData) {
    const html = pug.renderFile(
      path.join(__dirname, '..', 'views', 'emails', `${template}.pug`),
      mailData
    );

    await this.newTransport().sendMail({
      from: process.env.MAIL_FROM,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    });
  }

  async sendWelcome(username) {
    await this.send('welcome', 'Welcome to our app Alkemy-Disney', {
      username,
    });
  }
}

module.exports = { Email };
