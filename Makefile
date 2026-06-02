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
	node -e 'const base=process.env.APP_URL || "$(APP_URL)"; const paths=["/","/onboarding/problem/","/onboarding/solution/","/onboarding/how-it-works/","/onboarding/social-proof/","/auth/","/sign-in/","/sign-up/basic-info/","/sign-up/location/","/sign-up/sports/","/sign-up/goal/","/sign-up/permissions/","/welcome/","/home/","/discover/","/training/","/favorites/","/profile/","/studio/zen-studio-kadikoy/","/studio/zen-studio-kadikoy/slots/","/booking/summary/","/booking/confirmed/","/reservations/","/qr-entry/","/filter/"]; Promise.all(paths.map(async p=>{const r=await fetch(base+p); if(r.status!==200) throw new Error(`$${p} $${r.status}`); return p;})).then(ps=>console.log(`ok $${ps.length} routes`)).catch(e=>{console.error(e); process.exit(1)})'

clean:
	rm -rf dist tsconfig.tsbuildinfo node_modules/.vite
