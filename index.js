const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").load();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./config/routes")(app);

if (process.env.NODE_ENV === "production") {
	// Express will serve up production assets
	app.use(express.static("client/build"));
	// Express will serve up index.html if it doesn't recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);