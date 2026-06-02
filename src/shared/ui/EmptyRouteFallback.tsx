import type { NavFn } from "../lib/navigation";
import { routes } from "../lib/routes";
import { AppCanvas } from "./AppCanvas";
import { PrimaryButton } from "./Button";
import { Icon } from "./Icon";

export function EmptyRouteFallback({ navigate }: { navigate: NavFn }) {
  return (
    <AppCanvas className="flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Sportlife</h1>
        <p className="mt-2 text-sm text-sport-muted">Bu demo route'u bulunamadı.</p>
        <PrimaryButton className="mt-6" onClick={() => navigate(routes.home)}>
          Ana Sayfa <Icon name="arrow_forward" />
        </PrimaryButton>
      </div>
    </AppCanvas>
  );
}
