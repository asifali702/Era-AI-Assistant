import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import SplashScreen from '@/components/SplashScreen';
import HomeScreen from '@/components/HomeScreen';
import ListeningScreen from '@/components/ListeningScreen';
import SettingsScreen from '@/components/SettingsScreen';

type Screen = 'splash' | 'home' | 'listening' | 'settings';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('splash');
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {screen === 'splash' && (
        <SplashScreen onContinue={() => setScreen('home')} />
      )}
      {screen === 'home' && (
        <HomeScreen
          onListen={() => setScreen('listening')}
          onSettings={() => setScreen('settings')}
        />
      )}
      {screen === 'listening' && (
        <ListeningScreen onClose={() => setScreen('home')} />
      )}
      {screen === 'settings' && (
        <SettingsScreen onBack={() => setScreen('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
