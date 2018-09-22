var nodemailer = require("nodemailer");

require('dotenv').load();

class Mailer {
	constructor() {
		this.setSettings()
		this.setMailOptions()
		this.createTransporter()
	}

	setSettings() {
		this.email = process.env.email
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