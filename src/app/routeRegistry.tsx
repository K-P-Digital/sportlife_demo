import type { ComponentType } from "react";
import { AuthScreen, SignInScreen, WelcomeScreen } from "../features/auth/AuthScreens";
import {
  BookingConfirmedScreen,
  BookingSummaryScreen,
  FilterScreen,
  QrEntryScreen,
  ReservationsScreen,
  SlotSelectionScreen,
  StudioDetailScreen
} from "../features/booking/FlowScreens";
import { OnboardingHow, OnboardingProblem, OnboardingSocial, OnboardingSolution } from "../features/onboarding/OnboardingScreens";
import { SignUpBasic, SignUpGoal, SignUpLocation, SignUpPermissions, SignUpSports } from "../features/signup/SignUpScreens";
import { SplashScreen } from "../features/splash/SplashScreen";
import { DiscoverScreen, FavoritesScreen, HomeScreen, ProfileScreen, TrainingScreen } from "../features/tabs/TabScreens";
import type { ScreenProps } from "../shared/lib/navigation";
import { routes } from "../shared/lib/routes";

type RouteEntry = {
  path: string;
  Screen: ComponentType<ScreenProps>;
};

export const routeRegistry: RouteEntry[] = [
  { path: routes.root, Screen: SplashScreen },
  { path: routes.splash, Screen: SplashScreen },
  { path: routes.onboardingProblem, Screen: OnboardingProblem },
  { path: routes.onboardingSolution, Screen: OnboardingSolution },
  { path: routes.onboardingHow, Screen: OnboardingHow },
  { path: routes.onboardingSocial, Screen: OnboardingSocial },
  { path: routes.auth, Screen: AuthScreen },
  { path: routes.signIn, Screen: SignInScreen },
  { path: routes.signUpBasic, Screen: SignUpBasic },
  { path: routes.signUpLocation, Screen: SignUpLocation },
  { path: routes.signUpSports, Screen: SignUpSports },
  { path: routes.signUpGoal, Screen: SignUpGoal },
  { path: routes.signUpPermissions, Screen: SignUpPermissions },
  { path: routes.welcome, Screen: WelcomeScreen },
  { path: routes.home, Screen: HomeScreen },
  { path: routes.discover, Screen: DiscoverScreen },
  { path: routes.training, Screen: TrainingScreen },
  { path: routes.favorites, Screen: FavoritesScreen },
  { path: routes.profile, Screen: ProfileScreen },
  { path: routes.studio, Screen: StudioDetailScreen },
  { path: routes.slots, Screen: SlotSelectionScreen },
  { path: routes.bookingSummary, Screen: BookingSummaryScreen },
  { path: routes.bookingConfirmed, Screen: BookingConfirmedScreen },
  { path: routes.reservations, Screen: ReservationsScreen },
  { path: routes.qr, Screen: QrEntryScreen },
  { path: routes.filter, Screen: FilterScreen }
];
