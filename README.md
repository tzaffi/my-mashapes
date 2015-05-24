# my-mashapes

One off, dockerizable node express bridges to some of my favorite [mashape](https://www.mashape.com) API's

**WIP**

##First, let's put the links down

* Yodaize virtually any English sentence with [Yoda Speak](https://www.mashape.com/ismaelc/yoda-speak)
* Simple happy vs. sad sentiment analysis with [Loud Element](https://www.mashape.com/loudelement/free-natural-language-processing-service)
* Get geographic information from an IP Address with [Neutrino](https://www.mashape.com/neutrinoapi/ip-info)

## Next, I need to get accounts and API keys

* That's done. See the local config.json for each file

## Here's what you can excect

### YODA:

Click on (http://localhost:9999/I like baseball very much. But I really like basketball much more than baseball.)
should result in 
```
Baseball very much I like. But much more than baseball I really like basketball. Hmmmmmm.
```

