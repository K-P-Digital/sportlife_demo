import type { ReactNode } from "react";
import { tabs } from "../data/content";
import type { NavFn } from "../lib/navigation";
import { AppCanvas } from "./AppCanvas";
import { Icon } from "./Icon";

export function BottomNav({ active, navigate }: { active: string; navigate: NavFn }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-[84px] w-full max-w-[430px] -translate-x-1/2 items-center justify-around border-t border-white/5 bg-[#0F0F0F]/90 px-3 pb-5 pt-2 backdrop-blur-xl">
      {tabs.map((tab) => {
        const isActive = tab.path === active;
        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className={`flex w-16 flex-col items-center justify-center gap-1 transition-colors ${isActive ? "text-sport-lime" : "text-sport-muted hover:text-white"}`}
          >
            <Icon name={tab.icon} className="text-[24px]" fill={isActive} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function TabScreen({
  active,
  navigate,
  children,
  className = ""
}: {
  active: string;
  navigate: NavFn;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AppCanvas className={`pb-28 ${className}`}>
      {children}
      <BottomNav active={active} navigate={navigate} />
    </AppCanvas>
  );
}
