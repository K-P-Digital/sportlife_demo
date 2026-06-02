import { useCallback, useEffect, useState } from "react";
import { EmptyRouteFallback } from "../shared/ui";
import type { NavFn } from "../shared/lib/navigation";
import { normalizePath } from "../shared/lib/routes";
import { routeRegistry } from "./routeRegistry";

export function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = useCallback<NavFn>((next) => {
    const normalized = normalizePath(next);
    window.history.pushState({}, "", normalized);
    setPath(normalized);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const props = { navigate };
  const match = routeRegistry.find((route) => route.path === path);

  return match ? <match.Screen {...props} /> : <EmptyRouteFallback navigate={navigate} />;
}
