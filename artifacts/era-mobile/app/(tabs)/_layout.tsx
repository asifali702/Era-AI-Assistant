import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';

// No tab bar — ERA is a single-screen state-machine app.
export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
