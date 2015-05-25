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
  "contentType": "text/plain", // could be "application/json"
  "needsApiKey": true,
  "apiKeyName": "monkey-api-key",
  "apiKeyValue": "ZephaniahWasABullfrog",
  "needsApiSecret": true,
  "apiSecretName": "monkey-api-secret",
  "apiSecretValue": "a23pouiajsfldkhjoip32uiqrjwagkbpj;fja"
  "multipleParams": false,
  "urlParams": "sentence" // or when multipleParams true ["font", "meme", "top", "bottom"]
  "urlDefault": ["Impact"] // required when multipleParams true
} 
 *
 * Note, that currently multipleParms must be false, and the following are not supported:
 *
 * YOU ARE DULY WARNED THAT YOU STILL NEED TO RESPECT 
 * THE TERMS OF EACH WEB SERVICE AND MAY QUICKLY RUN
 * UP HUGE API FEES IF YOU DON'T CORDON OFF YOUR SITE 
 * APPROPRIATELY.
 *************/

var _ = require('lodash');
var querystring = require('querystring');
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
 * Different cases depending on whether config.multipleParams
 * is true or false.
 * if config.multipleParams:
 *    split the req.url using "/" as separator into parameters
 *    text process each of these 
 *    concatenate config.urlDefault + the above
 *    append ?param1=value1&param2=value2 with values taken from the above
 * else:
 *    just append ?theUrlParam=the text processed request url
 **/
function mashapeURL(req, config){
    var url;
    if(config.multipleParams){
	console.log("Considering multiple params");
	var params = req.url.split("/");
	params.splice(0,1); //get rid of first empty string since url starts with "/"
	//	console.log("Are these the guys????", params);
	params = _.map(params, _.flow(mashapeTexterize,decodeURI))
        //	console.log("How about these????", params);
	params = config.urlDefault.concat(params);
	//	console.log("READY NOW???", params);
	var zipped = _.zip(config.urlParams, params);
	var paramObj = {};
	_.map(zipped, function(x){ return paramObj[x[0]] = x[1] });
	console.log("paramObj:\n", paramObj);
	url = config.url + "?" + querystring.stringify(paramObj);
	//console.log("MUST BE NOW!!!!!!!!", url);
    } else {
	console.log("Only a single param");
	var preText = mashapeTexterize(decodeURI(req.url.substring(1)));
	console.log("preText: ", preText);
	url = config.url + "?" + config.urlParams + "=" + preText;
    }
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
console.log("API content-type: ", config.contentType);
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
	
	/*** WHILE DEBUGGING *** /
	mashapeURL(req, config)
	res.status(200).send("hello");
	/*** END WHILE DEBUGGING ***/
	var url = mashapeURL(req, config);
	console.log("Querying the url:\n", url);
	unirest.get(url)
	    .header(config.apiKeyName, config.apiKeyValue)
	    .header("Accept", config.contentType)
	    .end(function(result) {
		    console.log("\nstatus:\n", result.status, 
				"\nheaders:\n", result.headers, 
				"\nbody:\n", ( result.headers["content-type"].substring(0, 5) == "image" 
					       ? "<IMAGE>"
					       : result.body
					       ) 
				);
		    //res.setHeader( "content-type", result.headers["content-type"] )
		    //res.type('jpeg');
		    /*		    res.status(result.status)
			.send(result.body); //json(result.body)
		    */
		}).pipe(res);
    });

var server = app.listen(port, function () {
	//	var host = server.address().address;
	//	var port = server.address().port;
	//	console.log('REDIRECT app listening at http://%s:%s', host, port);
	//	console.log('REDIRECTING ALL TRAFFIC TO ', REDIRECT_IP);
	console.log("STARTING UP");
	
	});

