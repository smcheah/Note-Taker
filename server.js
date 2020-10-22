var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

// express app set up for server
// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

require("./public/assets/routes/routes.js")(app);

// listener for server
app.listen(PORT, function () {
	console.log(`listening at http://localhost:${PORT}`);
});
