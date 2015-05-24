var unirest = require('unirest');
// These code snippets use an open-source library.
unirest.get("https://yoda.p.mashape.com/yoda?sentence=You+will+learn+how+to+speak+like+me+someday.++Oh+wait.")
    .header("X-Mashape-Key", "mWyuM8J8D5mshAyf7CVKRB46albwp1JffBljsnWFXDexojALmG")
    .header("Accept", "text/plain")
    .end(function (result) {
	    console.log("\nstatus:\n", result.status, 
			"\nheaders:\n", result.headers, 
			"\nbody:\n", result.body);
	});