const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require("fs");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	const myJson = require("./jsonData/comments.json");

	const load = { myJson: myJson };
	res.render("index", load);
});

app.get("/data/", (req, res) => {
	const myData = require("./comments.json");
	console.log(myData[1]["id"]);
});

app.get("/quotes", (req, res) => {
	const myQuotes = require("./jsonData/quotes.json");
	const quotes = myQuotes.quotes;

	const load = { myQuotes: quotes };
	res.render("quotes", load);
});

app.get("/home", (req, res) => {
	const fs = require("fs");
	const directoryPath = "./jsonData";
	const jsonFiles = [];
	const load = { jsonFiles: jsonFiles };
	fs.readdir(directoryPath, (err, files) => {
		if (err) {
			console.error("Error reading directory:", err);
			return;
		}
		files.forEach((file) => {
			jsonFiles.push(file);
		});
		console.log(jsonFiles);
		res.render("home", load);
	});
});

app.listen(3000, () => {
	console.log("Server is live at port 3000.");
});
