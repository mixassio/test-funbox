app:
	docker-compose up

app-build:
	docker-compose build

app-bash:
	docker-compose run app bash

app-setup: app-build
	docker-compose run app npm install
