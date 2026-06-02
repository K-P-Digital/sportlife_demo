.PHONY: install dev build preview route-check clean

APP_URL ?= http://127.0.0.1:5173

install:
	npm install

dev:
	npm run dev -- --port 5173

build:
	npm run build

preview:
	npm run preview -- --port 4173

route-check:
	node scripts/check-routes.mjs

clean:
	rm -rf dist tsconfig.tsbuildinfo node_modules/.vite
