import { Icon } from "./Icon";

export function Chip({
  label,
  active,
  onClick,
  icon
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold transition-colors ${
        active ? "bg-sport-lime text-sport-bg" : "border border-white/5 bg-sport-panel text-sport-muted hover:text-white"
      }`}
    >
      {icon && <Icon name={icon} className="text-[16px]" />}
      {label}
    </button>
  );
}
