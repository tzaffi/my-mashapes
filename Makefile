images: yoda sentiment

services: yodaize sentimentize

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

yodaize:
	docker run -p 9999:8000 -d yoda

sentimentize:
	docker run -p 9998:8000 -d sentiment