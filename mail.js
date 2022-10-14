const nodemailer = require('nodemailer');

const fs = require('fs');
const inlineCss = require('inline-css');
const hogan = require('hogan.js');

module.exports.sent = async function () {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mahaubin@gmail.com',
      pass: 'elgipfceayrowjrp',
    },
  });

  const templateFile = fs.readFileSync('./template/template.html');
  const templateStyle = await inlineCss(templateFile.toString(), {
    url: 'file://' + __dirname + '/template/',
  });
  const templateCompiled = hogan.compile(templateStyle);
  const templateRendered = templateCompiled.render({
    text: 'Bonjour monsiuer Soary! iza tianao Grace sa Soary eh?',
  });

  const mailOption = {
    from: 'mahaubin@gmail.com',
    to: 'zeihnswitch@gmail.com',
    subject: 'teste de mail',
    // text: 'ok',
    html: templateRendered,
  };

  await transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log('email sent ' + info.response);
    }
  });
};
