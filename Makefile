images: yoda sentiment meme

services: yodaize sentimentize memeize

yoda:
	-cp package.json yodaspeak/.
	-cp intermediator.js yodaspeak/.
	-docker build -t yoda yodaspeak/
	-rm yodaspeak/package.json
	-rm yodaspeak/intermediator.js

sentiment:
	-cp package.json loudelement/.
	-cp intermediator.js loudelement/.
	-docker build -t sentiment loudelement/
	-rm loudelement/package.json
	-rm loudelement/intermediator.js

meme:
	-cp package.json apimeme/.
	-cp intermediator.js apimeme/.
	-docker build -t meme apimeme/
	-rm apimeme/package.json
	-rm apimeme/intermediator.js

yodaize:
	docker run -p 9999:8000 -d yoda

sentimentize:
	docker run -p 9998:8000 -d sentiment

memeize:
	docker run -p 9997:8000 -d meme

nuke:
	-docker stop `docker ps -aq`
	-docker rm -fv `docker ps -aq`
	-docker images -q --filter "dangling=true" | xargs docker rmi

.PHONY: nuke