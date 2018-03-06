//imports
var express = require('express');
var bodyParser = require('body-parser');
var requestAPI = require('request');

app = express();
//Create express object

var port = process.env.PORT || 5000;
//Assign port
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

app.get("/api", function (req, res) {
    res.send("Server running!");
});
//GET Endpoint

app.post("/api", function (req, res) {
    console.log(req);
    res.json('Testing');
});
//POST EndPoint

console.log("Server Running at Port : " + port);

app.listen(port);