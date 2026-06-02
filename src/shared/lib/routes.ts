export const routes = {
  root: "/",
  splash: "/splash",
  onboardingProblem: "/onboarding/problem",
  onboardingSolution: "/onboarding/solution",
  onboardingHow: "/onboarding/how-it-works",
  onboardingSocial: "/onboarding/social-proof",
  auth: "/auth",
  signIn: "/sign-in",
  signUpBasic: "/sign-up/basic-info",
  signUpLocation: "/sign-up/location",
  signUpSports: "/sign-up/sports",
  signUpGoal: "/sign-up/goal",
  signUpPermissions: "/sign-up/permissions",
  welcome: "/welcome",
  home: "/home",
  discover: "/discover",
  training: "/training",
  favorites: "/favorites",
  profile: "/profile",
  studio: "/studio/zen-studio-kadikoy",
  slots: "/studio/zen-studio-kadikoy/slots",
  bookingSummary: "/booking/summary",
  bookingConfirmed: "/booking/confirmed",
  reservations: "/reservations",
  qr: "/qr-entry",
  filter: "/filter"
} as const;

export type Route = (typeof routes)[keyof typeof routes];

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return routes.root;
  return pathname.replace(/\/+$/, "");
}
