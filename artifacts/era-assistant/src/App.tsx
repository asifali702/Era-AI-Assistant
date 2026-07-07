import { useState } from "react";
import { PhoneFrame } from "./components/era/phone-frame";
import { SplashScreen } from "./components/era/splash-screen";
import { HomeScreen } from "./components/era/home-screen";
import { ListeningScreen } from "./components/era/listening-screen";
import { SettingsScreen } from "./components/era/settings-screen";

type Screen = "splash" | "home" | "listening" | "settings";

const screens: { id: Screen; label: string }[] = [
  { id: "splash", label: "Splash" },
  { id: "home", label: "Home" },
  { id: "listening", label: "Listening" },
  { id: "settings", label: "Settings" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");

  return (
    <main className="min-h-screen w-full bg-secondary px-4 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">ERA AI Assistant</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Interactive UI prototype — tap through the screens
          </p>
        </div>

        {/* Screen switcher */}
        <div className="mb-6 flex flex-wrap justify-center gap-2 rounded-full bg-card p-1.5 shadow-sm ring-1 ring-border">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                screen === s.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <PhoneFrame>
          <div key={screen} className="era-fade-up h-full w-full">
            {screen === "splash" && <SplashScreen onContinue={() => setScreen("home")} />}
            {screen === "home" && (
              <HomeScreen
                onListen={() => setScreen("listening")}
                onSettings={() => setScreen("settings")}
              />
            )}
            {screen === "listening" && <ListeningScreen onClose={() => setScreen("home")} />}
            {screen === "settings" && <SettingsScreen onBack={() => setScreen("home")} />}
          </div>
        </PhoneFrame>
      </div>
    </main>
  );
}
