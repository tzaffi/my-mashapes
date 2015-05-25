var unirest = require('unirest');
// These code snippets use an open-source library.
unirest.get("https://ronreiter-meme-generator.p.mashape.com/meme?bottom=Why+you+no&font=Impact&font_size=50&meme=Advice+Yoda&top=say+hi")
    .header("X-Mashape-Key", "YOUR API KEY HERE")
    .end(function (result) {
	    console.log(result.status, result.headers, result.body);
	});
