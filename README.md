# Email-greeting

Email-greeting is a website to showcase some code I wrote sometime ago. This small app itseff uses node and express in the back-end and vanilla javascript in the front-end. Style is applied using the materialize CSS library. It is deployed with heroku and to send emails uses gmail's API.

Its arquitecture is pretty simple. Node+express serve index.html. Index.html renders a form and loads main.js the is use to grab the data from the form and through a XMLHttpRequest post request to a route defined with node uses gmail's api to send a template hosted on the server to the email address introduced by the user.



## The Code

The code I am refering to is in the two files in the services folder, Mailer.js and HtmlGenerator.js .

The goal was to create a email service on a website I was on. After some reasearch I found the open source package nodemailer that specifically is uses just for node.js and it works with gmail accounts. Amazingly, given the popularity of these two platforms, node.js and google, there are not many solutions out there to implement this. The package is great and delivers on what is promises. Unfortunately,  the documentation back when I worked on its implementation was not the best one. I recognize that it took me time and effort to write this two files. Now I look at them I think they are beautiful.

The hard work went on when nodemailer asked for an extra piece of information, data from Google that I never used before, the refresh token, and that is not provided by on the Developer Console of your google account but in the [oAuth playground](https://developers.google.com/oauthplayground). It surprises me how little information there is present about this process. I found a blog post from someone that was in my exactly same situation and helped me with this part of the process.



## What did I learnt?

It was my first time working with the fs node's API.

```javascript
var Handlebars = require('handlebars');
var fs = require('fs');

function HtmlGenerator(template, data) {
	return new Promise((resolve, reject) => {
		fs.readFile(template + '.html', 'utf8', function (err, html) {
			if (err) {
				return reject(err);
			}

			var source = html
			var template = Handlebars.compile(source);
			return resolve(template(data))
		})
	})
}

module.exports = HtmlGenerator
```

And also my first time creating a custome javascript class adding methods to it and exporting it.

```javascript
var nodemailer = require("nodemailer");
require('dotenv').load();

class Mailer {
	constructor() {
		this.setSettings()
		this.setMailOptions()
		this.createTransporter()
	}

	setSettings() {
		this.email = process.env.EMAIL
		this.clientId = process.env.email_clientId
		this.clientSecret = process.env.email_clientSecret
		this.refreshToken = process.env.email_refreshToken
	}

	setMailOptions() {
		this.mailOptions = {
			from: this.email,
			to: "someEmailAdress@gmail.com",
			subject: "Hello World",
			generateTextFromHTML: true,
			html: "<b>Hello world</b>"
		}
	}

	createTransporter() {
		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				type: 'OAuth2',
				user: this.email,
				clientId: this.clientId,
				clientSecret: this.clientSecret,
				refreshToken: this.refreshToken,
			}
		});
	}

	setRecipient(email) {
		this.mailOptions.to = email
	}

	setSubject(subject) {
		this.mailOptions.subject = subject
	}

	setHtml(html) {
		this.mailOptions.html = html
	}

	sendEmail(to, subject, html, callback) {
		if (!to) throw new Error('specify to')
		if (!subject) throw new Error('specify subject')
		if (!html) throw new Error('specify html')

		this.setRecipient(to)
		this.setSubject(subject)
		this.setHtml(html)

		this.transporter.sendMail(this.mailOptions, (error, response) => {
			if (error) {
				console.log(error);
				callback(error)
			} else {
				console.log(response);
				callback(response)
			}
			this.transporter.close();
		});
	}
}

module.exports = Mailer
```

I also learnt that pushing yourself to do something the write way pays off. I've been able to use this mailer several times. It is very versatile and easy to implement.



------

Thank you for stopping by.

Carlos