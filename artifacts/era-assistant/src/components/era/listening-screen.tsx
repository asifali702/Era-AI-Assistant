import { Mic, X } from "lucide-react";
import { StatusBar } from "./phone-frame";

const bars = [0.2, 0.5, 0.35, 0.8, 0.45, 0.9, 0.3, 0.6, 0.4, 0.75, 0.25];

export function ListeningScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-primary text-primary-foreground">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <StatusBar dark />

      {/* Close */}
      <div className="flex justify-end px-6 pt-2">
        <button
          onClick={onClose}
          aria-label="Stop listening"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur-sm transition-transform active:scale-90"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Listening indicator */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="relative flex items-center justify-center">
          <span className="era-pulse-ring absolute h-44 w-44 rounded-full bg-primary-foreground/20" />
          <span
            className="era-pulse-ring absolute h-44 w-44 rounded-full bg-primary-foreground/15"
            style={{ animationDelay: "1s" }}
          />
          <div className="era-float flex h-32 w-32 items-center justify-center rounded-full bg-primary-foreground text-primary">
            <Mic className="h-12 w-12" strokeWidth={2.2} />
          </div>
        </div>

        <p className="era-fade-up mt-12 text-xl font-semibold">Listening…</p>

        {/* Equalizer */}
        <div className="mt-6 flex h-12 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="era-bar w-1.5 rounded-full bg-primary-foreground/80"
              style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        <p className="era-fade-up mt-10 max-w-[240px] text-center text-base leading-relaxed text-primary-foreground/80">
          {'"Call Mom and turn on the torch"'}
        </p>
      </div>

      {/* Suggestions */}
      <div className="px-6 pb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {["Set an alarm", "Open WhatsApp", "Call John"].map((s) => (
            <span
              key={s}
              className="rounded-full bg-primary-foreground/15 px-4 py-2 text-xs font-medium text-primary-foreground/90 backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
