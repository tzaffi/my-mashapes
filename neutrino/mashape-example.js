var unirest = require('unirest');
// These code snippets use an open-source library.
unirest.post("https://community-neutrino-ip-info.p.mashape.com/ip-info")
    .header("X-Mashape-Key", "YOUR KEY HERE")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .send("ip=162.209.106.137")
    .send("reverse-lookup=false")
    .end(function (result) {
	    console.log(result.status, result.headers, result.body);
	});