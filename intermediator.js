/*************
 * Start an express server that acts as an intermediary between 
 * the outside world and an API web service that is specified
 * at start-up time. This allows an entire domain to access
 * an API that requires a key.
 *
 * USAGE: node intermediator.js PORT path/to/config.json
 *
 * config-json should look like:
{
  "url": "https://the.monkey-api-url.com",
  "needsApiKey": true,
  "apiKeyName": "monkey-api-key",
  "apiKeyValue": "ZephaniahWasABullfrog",
  "needsApiSecret": true,
  "apiSecretName": "monkey-api-secret",
  "apiSecretValue": "a23pouiajsfldkhjoip32uiqrjwagkbpj;fja"
  "multipleParams": false,
  "urlParams": "sentence"
} 
 *
 * Note, that currently multipleParms must be false, and the following are not supported:
 *
 * YOU ARE DULY WARNED THAT YOU STILL NEED TO RESPECT 
 * THE TERMS OF EACH WEB SERVICE AND MAY QUICKLY RUN
 * UP HUGE API FEES IF YOU DON'T CORDON OFF YOUR SITE 
 * APPROPRIATELY.
 *************/

var express = require('express');
var unirest = require('unirest');
var app = express();

/***
 * Replace spaces with "+"...
 * ... for now
 ***/
function mashapeTexterize(str){
    return str.replace(/ /g,"+");
}

/**
 * Process the request, pass along the relevant info to mashape,
 * and report back the results.
 **/
function mashapeURL(req, config){
    var preText = mashapeTexterize(decodeURI(req.url.substring(1)));
    console.log("preText: ", preText);
    var url = config.url + "?" + config.urlParams + "=" + preText;
    return url;
}

console.log("USAGE:\n node intermediator.js path/to/config.json\n\n");

var usage = "node intermediator.js PORT path/to/config.json";
var port = parseInt(process.argv[2]);
var configPath = "./" + process.argv[3];
var config = require(configPath);

console.log("Starting intermediator on port ", port);
console.log("Configuration ", configPath, " says:\n", config);
console.log("API url: ", config.url);
console.log("API needs key: ", config.needsApiKey);
console.log("API needs multiple params: ", config.multipleParams);
console.log("API url params: ", config.urlParams);

app.get('*', function (req, res) {
	var interestingBits = {
	    headers: req.headers,
	    originalUrl: req.originalUrl,
	    params: req.params,
	    query: req.query,
	    url: req.url
	};
	console.log("interesting bits\n", interestingBits);

	unirest.get(mashapeURL(req, config))
	    .header(config.apiKeyName, config.apiKeyValue)
	    .header("Accept", "text/plain")
	    //.header("Accept", "application/json")
	    .end(function(result) {
		    console.log("\nstatus:\n", result.status, 
				"\nheaders:\n", result.headers, 
				"\nbody:\n", result.body);
		    
		    res.status(result.status).send(result.body); //json(result.body)
			});
    });

var server = app.listen(port, function () {
	//	var host = server.address().address;
	//	var port = server.address().port;
	//	console.log('REDIRECT app listening at http://%s:%s', host, port);
	//	console.log('REDIRECTING ALL TRAFFIC TO ', REDIRECT_IP);
	console.log("STARTING UP");
	
	});

