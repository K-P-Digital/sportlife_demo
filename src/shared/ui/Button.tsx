import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function PrimaryButton({
  children,
  onClick,
  className = ""
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={`flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-sport-lime px-5 text-[16px] font-bold text-sport-bg shadow-[0_0_24px_rgba(212,255,79,0.18)] transition-opacity hover:opacity-90 active:scale-[0.98] ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  onClick,
  className = ""
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-sport-border bg-sport-panel text-white transition-colors hover:bg-sport-elevated ${className}`}
      type="button"
      onClick={onClick}
    >
      <Icon name={icon} className="text-[22px]" />
    </button>
  );
}
