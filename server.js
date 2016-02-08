var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var sanitizer = require('sanitizer');
var _ = require('lodash');
var transport = require('./server/emailTransport.js')

app.use(bodyParser.urlencoded({extended: true}));

var nodemailer = require('nodemailer');
 
app.set('port', (process.env.PORT || 3333));

app.use(express.static(__dirname + '/client'));

app.get('/resume',
  function(req, res) {
    res.download(__dirname + "/server/RyanTangResume.pdf", "RyanTangResume.pdf");
  });

app.post('/contact',
	function(req, res) {
		var data = _(req.body).forEach(function(v) {
			sanitizer.sanitize(v);
		});
		// create reusable transporter object using the default SMTP transport 
		var transporter = nodemailer.createTransport(transport.payload);
		 
		// setup e-mail data with unicode symbols 
		var mailOptions = {
	    from: data.email,
	    to: 'ryantang333@gmail.com',
	    subject: data.subject + " -" + data.name,
	    text: data.message
		};
		 
		// send mail with defined transport object 
		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
				res.status(500).send("Sorry, looks like something went wrong. Try again, and if it still doesn't work and you aren't too frustrated, please send me an email. :)");

        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
			res.status(200).send("Thanks for your message! I'll get back to you as soon as I can.");
		});
	});

app.listen(app.get('port'), function() {
  console.log('RUNNING AWAY FROM YOU THROUGH PORT', app.get('port'));
});