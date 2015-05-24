var unirest = require('unirest');
// These code snippets use an open-source library.
unirest.get("https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-text/?text=Friends+and+fellow+sailors+mourned+double+Olympic+medalist+Andrew+%22Bart%22+Simpson+after+the+shocking+news+that+he+had+died+in+San+Francisco+Bay+while+training+for+the+America's+Cup.")
    .header("X-Mashape-Key", "YOUR KEY HERE")
    .header("Accept", "application/json")
    .end(function (result) {
	    console.log(result.status, result.headers, result.body);
	});