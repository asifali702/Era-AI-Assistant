import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Device body */}
      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.75rem] border-[10px] border-[#0b1220] bg-[#0b1220] shadow-2xl">
        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-background">
          {/* Status bar notch */}
          <div className="pointer-events-none absolute left-1/2 top-2 z-50 h-6 w-28 -translate-x-1/2 rounded-full bg-[#0b1220]" />
          {children}
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute -right-[10px] top-28 h-16 w-[3px] rounded-r bg-[#0b1220]" />
      <div className="absolute -left-[10px] top-24 h-10 w-[3px] rounded-l bg-[#0b1220]" />
      <div className="absolute -left-[10px] top-36 h-10 w-[3px] rounded-l bg-[#0b1220]" />
    </div>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? "text-primary-foreground/90" : "text-foreground/80";
  return (
    <div className={`flex items-center justify-between px-6 pb-1 pt-3 text-xs font-medium ${color}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-4 rounded-[3px] border border-current opacity-70" />
        <span className="inline-block h-2.5 w-2.5 rounded-full border border-current opacity-70" />
        <span className="inline-block h-2.5 w-6 rounded-[3px] border border-current opacity-70" />
      </div>
    </div>
  );
}
