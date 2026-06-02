import type { Route } from "./routes";

export type NavFn = (path: Route | string) => void;

export type ScreenProps = {
  navigate: NavFn;
};
