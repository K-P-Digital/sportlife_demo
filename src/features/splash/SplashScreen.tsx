import type { ScreenProps } from "../../shared/lib/navigation";
import { AppCanvas } from "../../shared/ui";
import { routes } from "../../shared/lib/routes";

export function SplashScreen({ navigate }: ScreenProps) {
  return (
    <AppCanvas className="flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,255,79,0.04)_0%,rgba(212,255,79,0)_70%)]" />
      <button className="z-10 flex flex-col items-center" type="button" onClick={() => navigate(routes.onboardingProblem)}>
        <h1 className="text-[56px] font-extrabold leading-none tracking-[-2.5px] text-[#F5F5F5]">SPORTLIFE</h1>
        <div className="mb-[14px] mt-2 h-px w-16 bg-sport-lime" />
        <div className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#6B6B6B]">İSTANBUL</div>
      </button>
      <div className="absolute bottom-[60px] left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="relative h-[1.5px] w-[200px] overflow-hidden bg-sport-elevated">
          <div className="h-full w-[70%] bg-sport-lime" />
        </div>
        <div className="mt-2 text-[9px] text-[#3A3A3A]">Yükleniyor...</div>
      </div>
    </AppCanvas>
  );
}
