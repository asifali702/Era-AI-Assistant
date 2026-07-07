import { AlarmClock, Flashlight, Mic, MessageCircle, Phone, Settings } from "lucide-react";
import { StatusBar } from "./phone-frame";

const features = [
  { key: "call", label: "Call", Icon: Phone, tint: "bg-primary/10 text-primary" },
  { key: "whatsapp", label: "WhatsApp", Icon: MessageCircle, tint: "bg-emerald-500/10 text-emerald-600" },
  { key: "torch", label: "Torch", Icon: Flashlight, tint: "bg-amber-500/10 text-amber-600" },
  { key: "alarm", label: "Alarm", Icon: AlarmClock, tint: "bg-sky-500/10 text-sky-600" },
];

export function HomeScreen({
  onListen,
  onSettings,
}: {
  onListen: () => void;
  onSettings: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <StatusBar />

      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-3">
        <div>
          <p className="text-sm text-muted-foreground">Good morning</p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">ERA Assistant</h1>
        </div>
        <button
          onClick={onSettings}
          aria-label="Open settings"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform active:scale-90"
        >
          <Settings className="h-5 w-5" />
        </button>
      </header>

      {/* Greeting card */}
      <div className="era-fade-up mx-6 mt-5 rounded-3xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm text-primary-foreground/80">How can I help you today?</p>
        <p className="mt-1 text-base font-medium leading-relaxed">
          {'Say "Hey ERA" or tap the mic to start a conversation.'}
        </p>
      </div>

      {/* Mic button */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="era-pulse-ring absolute h-40 w-40 rounded-full bg-primary/25" />
          <span
            className="era-pulse-ring absolute h-40 w-40 rounded-full bg-primary/20"
            style={{ animationDelay: "1s" }}
          />
          <button
            onClick={onListen}
            aria-label="Start voice listening"
            className="era-glow relative flex h-36 w-36 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 active:scale-95"
          >
            <Mic className="h-14 w-14" strokeWidth={2.2} />
          </button>
        </div>
        <p className="mt-8 text-sm font-medium text-muted-foreground">Tap to speak</p>
      </div>

      {/* Quick actions */}
      <section className="px-6 pb-8">
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Quick actions</h2>
        <div className="grid grid-cols-4 gap-3">
          {features.map(({ key, label, Icon, tint }) => (
            <button
              key={key}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border transition-transform active:scale-95"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-full ${tint}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-medium text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
