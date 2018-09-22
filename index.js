const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").load();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/greetings", (req, res) => {
	res.send("hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);