//imports
var express = require('express');
var bodyParser = require('body-parser');
var requestAPI = require('request');
var apiai = require('apiai');

app = express();
//Create express object

var port = process.env.PORT || 5000;
//Assign port
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

var masterBot = apiai("7fc33a40eb164f68841b1084632b35d8");
var flightChildBot = apiai("f1a942148cb04df6a7157bec3d2b16ee");
var hotelChildBot = apiai("191d7f6fcd064ad2be39747829cb8264");
var weatherChildBot = apiai("bf2f2692d4b447aab70353c81220c5b4");


app.get("/api", function (req, res) {
    res.send("Server running!");
});
//GET Endpoint

app.post("/api", function (req, res) {
    console.log(JSON.stringify(req.body));

    var masterBotRequest = masterBot.textRequest(req.body.result.resolvedQuery, {
        sessionId: req.body.sessionId
    });

    masterBotRequest.on('response', function (response) {
        console.log(response);
        console.log('response');
        if (response.result.action === 'flight.child.intent') {
            console.log('inside flight child fn')
            invokeFlightBot(req, function (data) {
                console.log(data);
                res.json('Data Sent');
            });
        }
    });

    masterBotRequest.on('error', function (error) {
        console.log('error');
        console.log(error);
    });

    masterBotRequest.end();
    // res.json('Testing');
});
//POST EndPoint

function invokeFlightBot(req, callback) {
    var flightChildBotRequest = flightChildBot.textRequest(req.body.result.resolvedQuery, {
        sessionId: req.body.sessionId
    });

    flightChildBotRequest.on('response', function (response) {
        console.log('flight response');
        console.log(response);
    });

    flightChildBotRequest.on('error', function (error) {
        console.log(' flight error');
        console.log(error);
    });

    flightChildBotRequest.end();
    callback(null, null);
};

console.log("Server Running at Port : " + port);

app.listen(port);