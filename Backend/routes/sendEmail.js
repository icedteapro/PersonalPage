const express = require("express");
const mailer = require('express-mailer');
const router = express.Router();
const app = express();
const email = require('../models/EmailBox');

 //configEmail
 mailer.extend(app, {
  from: 'moonlightsculptor94@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'moonlightsculptor94@gmail.com',
    pass: '11052194'
  }
});


app.set('views','D:/Project/Personal/Portal/Backend' + '/template');
app.set('view engine', 'jade');

router.post("/", (req, res, next) => {
  const emailmodel = new email ({
    FullName: req.body.name,
    email: req.body.email,
    Subject: req.body.subject,
    Message: req.body.message
  })

  app.mailer.send('email', {
    to: 'namht@unit.com.vn', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject:'PersonalPage bot: '+ emailmodel.Subject, // REQUIRED.
    Message: emailmodel.Message, // All additional properties are also passed to the template as local variables.
    email: emailmodel.email,
    name: emailmodel.FullName
  }, function (err) {
     if (err) {
      next(err); // Pass errors to Express.
    }
    else {
    res.status(200).json({message: 'OK'});
    }
  });
});
module.exports = router;
  