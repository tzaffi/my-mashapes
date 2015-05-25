# my-mashapes

One off, dockerizable node express bridges to some of my favorite [mashape](https://www.mashape.com) API's

**WIP**

# TODO
* Compare the [**neutrino** ip locator](./neutrino/mashape-example.js) to see how **POST**'s need to be handled
 * In particular `post` and `send` are used.
 * Multiple paramsters are `send`'ed
* Add a `Dockerfile` in each directory
* Add a `makefile`. It should allow you to
 * run each api at a preconfigured port
 * build each docker image
 * run each docker image at a preconfigured port
* Explain the meme api. In particular:
 * BAD YODA: http://localhost:7111/Darth%20Maul/why%20you%20no/say%20hi?
 * GOOD YODA: http://localhost:7111/Advice%20Yoda/why%20you%20no/say%20hi?
##First, let's put the links down

* Yodaize virtually any English sentence with [Yoda Speak](https://www.mashape.com/ismaelc/yoda-speak)
* Simple happy vs. sad sentiment analysis with [Loud Element](https://www.mashape.com/loudelement/free-natural-language-processing-service)
* Get geographic information from an IP Address with [Neutrino](https://www.mashape.com/neutrinoapi/ip-info)

## Next, I need to get accounts and API keys

* That's done. See the local config.json for each file

## Here's what you can expect

### YODA:

From the top level project directory, start with the command:
```
node intermediator.js 9999 yodaspeak/config.json
```

Clicking on 
[http://localhost:9999/I like baseball very much. But I really like basketball much more than baseball.](http://localhost:9999/I%20like%20baseball%20very%20much.%20But%20I%20really%20like%20basketball%20much%20more%20than%20baseball.)
should result in 
```
Baseball very much I like. But much more than baseball I really like basketball. Hmmmmmm.
```

### Sentiment Analysis through Loud Element

**THANK YOU Taewook Kang (taewook.kang@gmail.com)**

From the top level project directory, start with the command:
```
node intermediator.js 9999 loudelement/config.json
```

Clicking on 

[http://localhost:9999/I like baseball very much. But I really like basketball much more than baseball.](http://localhost:9999/I%20like%20baseball%20very%20much.%20But%20I%20really%20like%20basketball%20much%20more%20than%20baseball.)

should result in 
```json
{
api-author: "Taewook Kang (taewook.kang@gmail.com)",
api-usage: "completely free as long as you give me credit somewhere on your website.",
sentiment-text: "positive",
sentiment-score: 0.66666666666633,
status: "OK",
language: "English"
}
```

### MEME GENERATER:

TODO

## Dockerizing

You can create docker containers for each application.
For example, to create a docker container `yoda` for yodaspeak run
`make yoda` (see the [the Makefile](./Makefile) for the actual Docker command).

To run the container web service use `make yodaize`.

Note the the docker webservice **DOES NOT RUN ON LOCALHOST** but runs on 
`http://192.168.99.100:9999/hello%20yoda` instead. So with docker the above
url would look like:

[http://192.168.99.100:9999/I like baseball very much. But I really like basketball much more than baseball.](http://192.168.99.100:9999/I%20like%20baseball%20very%20much.%20But%20I%20really%20like%20basketball%20much%20more%20than%20baseball.)

Similarly, `make sentiment` builds the container
and `make sentimentize` runs the container on
port 9998.

