import { IconButton } from "./Button";

export function TransactionHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className="fixed left-1/2 top-0 z-50 flex h-16 w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-b border-white/10 bg-sport-bg px-4">
      <IconButton icon="arrow_back" label="Geri" onClick={onBack} className="h-9 w-9" />
      <h1 className="font-epilogue text-lg font-bold uppercase tracking-tight text-white">{title}</h1>
      <div className="h-9 w-9" />
    </header>
  );
}
