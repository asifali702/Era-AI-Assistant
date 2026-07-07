import { useState } from "react";
import {
  AlarmClock,
  ChevronLeft,
  ChevronRight,
  Flashlight,
  Info,
  MessageCircle,
  Mic,
  Moon,
  Phone,
  ShieldCheck,
  Volume2,
} from "lucide-react";
import { StatusBar } from "./phone-frame";

function Toggle({ defaultOn = false, labelId }: { defaultOn?: boolean; labelId?: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-labelledby={labelId}
      onClick={() => setOn((v) => !v)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

type Row = {
  key: string;
  label: string;
  desc: string;
  Icon: typeof Phone;
  tint: string;
  defaultOn?: boolean;
};

const featureRows: Row[] = [
  { key: "call", label: "Call", desc: "Voice-dial contacts", Icon: Phone, tint: "bg-primary/10 text-primary", defaultOn: true },
  { key: "whatsapp", label: "WhatsApp", desc: "Send messages hands-free", Icon: MessageCircle, tint: "bg-emerald-500/10 text-emerald-600", defaultOn: true },
  { key: "torch", label: "Torch", desc: "Toggle the flashlight", Icon: Flashlight, tint: "bg-amber-500/10 text-amber-600", defaultOn: true },
  { key: "alarm", label: "Alarm", desc: "Set alarms by voice", Icon: AlarmClock, tint: "bg-sky-500/10 text-sky-600" },
];

const prefRows: Row[] = [
  { key: "wake", label: "Wake word", desc: '"Hey ERA" detection', Icon: Mic, tint: "bg-primary/10 text-primary", defaultOn: true },
  { key: "voice", label: "Voice feedback", desc: "Spoken responses", Icon: Volume2, tint: "bg-primary/10 text-primary", defaultOn: true },
  { key: "dark", label: "Dark mode", desc: "Use a darker theme", Icon: Moon, tint: "bg-primary/10 text-primary" },
];

const linkRows = [
  { key: "privacy", label: "Privacy & permissions", Icon: ShieldCheck },
  { key: "about", label: "About ERA", Icon: Info },
];

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <StatusBar />

      {/* Header */}
      <header className="flex items-center gap-3 px-4 pb-2 pt-3">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform active:scale-90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* Profile */}
        <div className="era-fade-up mt-2 flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm ring-1 ring-border">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-foreground">Alex Morgan</p>
            <p className="truncate text-sm text-muted-foreground">ERA Premium</p>
          </div>
          <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
        </div>

        {/* Features */}
        <h2 className="mb-2 mt-6 px-1 text-sm font-medium text-muted-foreground">Features</h2>
        <div className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
          {featureRows.map((r, i) => (
            <div
              key={r.key}
              className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${r.tint}`}>
                <r.Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p id={`feature-label-${r.key}`} className="text-sm font-medium text-foreground">{r.label}</p>
                <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <Toggle defaultOn={r.defaultOn} labelId={`feature-label-${r.key}`} />
            </div>
          ))}
        </div>

        {/* Preferences */}
        <h2 className="mb-2 mt-6 px-1 text-sm font-medium text-muted-foreground">Preferences</h2>
        <div className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
          {prefRows.map((r, i) => (
            <div
              key={r.key}
              className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${r.tint}`}>
                <r.Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p id={`pref-label-${r.key}`} className="text-sm font-medium text-foreground">{r.label}</p>
                <p className="truncate text-xs text-muted-foreground">{r.desc}</p>
              </div>
              <Toggle defaultOn={r.defaultOn} labelId={`pref-label-${r.key}`} />
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border">
          {linkRows.map((r, i) => (
            <button
              key={r.key}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-secondary ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <r.Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 text-sm font-medium text-foreground">{r.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">ERA AI Assistant · v1.0.0</p>
      </div>
    </div>
  );
}
