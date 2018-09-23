const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").load();
const Mailer = require("./services/Mailer");
const HtmlGenerator = require("./services/HtmlGenerator");


//create app
const app = express();

//middleware
app.use(express.static("client"));
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.post("/api/greetings", (req, res) => {
	if (!req.body.email || !req.body.name) {
		return res.status(400).json("All fields are required");
	}
	const data = { name: req.body.name, email: req.body.email };
	console.log("DATA", data);
	const subject = "Howdy! " + data.name;
	HtmlGenerator('emailTemplate', data)
		.then(function (htmlString) {
			const mailer = new Mailer()
			mailer.sendEmail(
        data.email + ";" + process.env.MY_EMIL,
        subject,
        htmlString,
        function(response) {
          console.log("Email '", subject, "' sent to ", data.email);
        }
      );
		}).catch(function (err) {
			console.log('err =', err);
			return res.status(400).json("Something went wrong, please try again");
		});
		return res.status(200).json("Thank you for visiting");
});

//open server
const PORT = process.env.PORT || 5000;
app.listen(PORT);