import { IconButton } from "./Button";

export function ProgressHeader({
  step,
  total,
  progress,
  onBack,
  onSkip,
  label
}: {
  step?: number;
  total: number;
  progress: number;
  onBack?: () => void;
  onSkip?: () => void;
  label?: string;
}) {
  return (
    <header className="sticky top-0 z-40 bg-sport-bg/95 px-5 pb-5 pt-12 backdrop-blur-md">
      <div className="flex h-10 items-center justify-between">
        {onBack ? (
          <IconButton icon="arrow_back" label="Geri" onClick={onBack} />
        ) : (
          <button className="text-[13px] font-semibold text-sport-muted" type="button" onClick={onSkip}>
            Geç
          </button>
        )}
        <span className="font-epilogue text-[13px] font-bold uppercase tracking-[0.18em] text-sport-muted">
          {label ?? (step ? `ADIM ${step} / ${total}` : `01 / 0${total}`)}
        </span>
        {onSkip ? (
          <button className="text-[13px] font-bold uppercase tracking-wide text-sport-muted transition-colors hover:text-white" type="button" onClick={onSkip}>
            ATLA
          </button>
        ) : (
          <div className="h-10 w-10" />
        )}
      </div>
      <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-sport-elevated">
        <div className="h-full rounded-full bg-sport-lime shadow-[0_0_10px_rgba(212,255,79,0.35)]" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
