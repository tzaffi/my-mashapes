var unirest = require('unirest');
// These code snippets use an open-source library.
unirest.get("https://yoda.p.mashape.com/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait.")
    .header("X-Mashape-Key", "YOUR KEY HERE")
    .header("Accept", "text/plain")
    .end(function (result) {
	    console.log("\nstatus:\n", result.status, 
			"\nheaders:\n", result.headers, 
			"\nbody:\n", result.body);
	});