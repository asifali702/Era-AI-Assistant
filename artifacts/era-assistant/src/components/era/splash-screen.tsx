import { Sparkles } from "lucide-react";

export function SplashScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      onClick={onContinue}
      aria-label="Enter ERA AI Assistant"
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-primary text-primary-foreground"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="era-float flex flex-col items-center">
        <div className="era-glow flex h-28 w-28 items-center justify-center rounded-[2rem] bg-primary-foreground/15 backdrop-blur-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary-foreground text-primary">
            <Sparkles className="h-10 w-10" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      <h1
        className="era-fade-up mt-8 text-4xl font-semibold tracking-tight"
        style={{ animationDelay: "0.15s" }}
      >
        ERA
      </h1>
      <p
        className="era-fade-up mt-2 text-sm font-medium text-primary-foreground/70"
        style={{ animationDelay: "0.3s" }}
      >
        AI Assistant
      </p>

      <div
        className="era-fade-up absolute bottom-16 flex flex-col items-center gap-3"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="h-1 w-32 overflow-hidden rounded-full bg-primary-foreground/20">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-primary-foreground" />
        </div>
        <span className="text-xs text-primary-foreground/60">Tap to continue</span>
      </div>
    </button>
  );
}
