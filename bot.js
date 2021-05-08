/**
 * Created by h on 4/20/2019.
 */
var telegram = require('telegram-bot-api');
var path = require('path');
const config = require('./config')
var api = new telegram({
  //pass token to _setting
  token: config.bot_token,
  //set updates enabled true
  updates: {
    enabled: true
  }
});

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.mailer,
    pass: config.pass
  }
});

api.on('message', function (message) {
  // Received text message
  console.log('-------------on message---------------');
  console.log(message);

  var mailOptions = {
    from: config.mailer,
    to: config.to,
    subject: config.subject,
    text: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info);
    }
  });
});
