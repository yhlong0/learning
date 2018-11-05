"use strict";

//SPDX-License-Identifier: Apache-2.0

// call the packages we need
var express           = require("express");        // call express
var app               = express();                 // define our app using express
var bodyParser        = require("body-parser");
var path              = require("path");
const cors = require("cors");

// Save our port
var port = process.env.PORT || 3000;

// Load all of our middleware
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({}));
app.options("*", cors());
app.use(cors());

// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, "../build")));

// app.get('/login', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/dist/login.html'), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "../build/index.html"), function(err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

// Start the server and listen on port
app.listen(port,function(){
	console.log("Live on port: " + port);
});
