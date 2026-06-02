import { Icon } from "./Icon";

export function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="font-epilogue text-[18px] font-extrabold uppercase tracking-tight text-white">{title}</h2>
      {action && (
        <button className="flex items-center gap-1 text-[12px] font-medium text-sport-muted hover:text-white" type="button" onClick={onAction}>
          {action}
          <Icon name="chevron_right" className="text-[15px]" />
        </button>
      )}
    </div>
  );
}
