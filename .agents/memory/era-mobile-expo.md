---
name: ERA Mobile Expo Port
description: Lessons from porting ERA AI Assistant web app to Expo React Native
---

## Hook-in-loop rule
`useAnimatedStyle` (and all hooks) cannot be called inside `.map()`. Always extract animated list items into named child components (`EqualizerBar`, `PulseRing`, `ToggleRow`, `ActionButton`). This was applied throughout the ERA mobile port.

**Why:** React throws "rendered more hooks than during previous render" when hooks are called conditionally or inside loops.

**How to apply:** Whenever iterating over a list that needs animation, create a separate component that takes the item as a prop and calls hooks at its own top level.

## EAS Build / Android APK from Replit
The Expo skill forbids running EAS CLI commands inside Replit. Android APK generation via EAS requires the user to run `eas build --platform android --profile preview` from their own machine after installing `eas-cli`. The project ships `eas.json` with a `preview` profile that builds an APK (not AAB). Replit's Expo Launch only supports iOS App Store submission.

## ERA color palette (HSL → hex)
- primary: HSL(258, 59%, 44%) → `#562EB2`
- primaryForeground: HSL(250, 20%, 99%) → `#FDFCFF`
- background: HSL(220, 25%, 97%) → `#F5F7F9`
- foreground: HSL(258, 22%, 16%) → `#251F31`
- secondary: HSL(250, 14%, 94%) → `#EFEEF2`
- secondaryForeground: HSL(258, 25%, 32%) → `#4A3D6B`
- mutedForeground: HSL(256, 8%, 50%) → `#7C758A`
- border: HSL(250, 10%, 90%) → `#E4E3E8`
- radius: 24px (1.5rem)
