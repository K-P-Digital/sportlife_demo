import type { ReactNode } from "react";

export function AppCanvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-sport-bg text-sport-text">
      <div className={`relative mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-sport-bg ${className}`}>
        {children}
      </div>
    </div>
  );
}
