const baseUrl = (process.env.APP_URL || "http://127.0.0.1:5173").replace(/\/+$/, "");

const routes = [
  "/",
  "/onboarding/problem",
  "/onboarding/solution",
  "/onboarding/how-it-works",
  "/onboarding/social-proof",
  "/auth",
  "/sign-in",
  "/sign-up/basic-info",
  "/sign-up/location",
  "/sign-up/sports",
  "/sign-up/goal",
  "/sign-up/permissions",
  "/welcome",
  "/home",
  "/discover",
  "/training",
  "/favorites",
  "/profile",
  "/studio/zen-studio-kadikoy",
  "/studio/zen-studio-kadikoy/slots",
  "/booking/summary",
  "/booking/confirmed",
  "/reservations",
  "/qr-entry",
  "/filter"
];

const failures = [];

for (const path of routes) {
  const response = await fetch(baseUrl + path);
  if (response.status !== 200) {
    failures.push({ path, status: response.status });
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`${failure.path} ${failure.status}`);
  }
  process.exit(1);
}

console.log(`ok ${routes.length} routes`);
