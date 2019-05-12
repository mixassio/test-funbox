S := app

PROJECT := workShop_infra

include make-app.mk

develop:
	npm run develop

start:
	npm start

install:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npx eslint .

.PHONY: test
