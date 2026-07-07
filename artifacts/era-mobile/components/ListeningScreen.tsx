import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import * as Haptics from 'expo-haptics';

// Extracted to avoid calling hooks inside .map()
function PulseRing({ delay }: { delay: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.2);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1.55, { duration: 2000, easing: Easing.out(Easing.quad) }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0, { duration: 2000, easing: Easing.out(Easing.quad) }),
        -1,
        false
      )
    );
  }, [scale, opacity, delay]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.pulseRing,
        animStyle,
        { backgroundColor: 'rgba(255,255,255,0.2)' },
      ]}
    />
  );
}

function FloatingMic() {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
  }, [translateY]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.micContainer, animStyle]}>
      <Feather name="mic" size={48} color="#562EB2" />
    </Animated.View>
  );
}

// Pre-computed bar heights to avoid randomness in render
const BAR_MAX_HEIGHTS = [20, 50, 35, 80, 45, 90, 30, 60, 40, 75, 25];
// Pre-computed durations (varied but deterministic)
const BAR_DURATIONS = [420, 350, 500, 300, 460, 380, 440, 320, 480, 360, 410];

// Extracted to avoid calling useAnimatedStyle inside .map()
function EqualizerBar({
  maxHeight,
  duration,
  delay,
}: {
  maxHeight: number;
  duration: number;
  delay: number;
}) {
  const height = useSharedValue(maxHeight * 0.3);

  useEffect(() => {
    height.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(maxHeight, { duration }),
          withTiming(maxHeight * 0.15, { duration })
        ),
        -1,
        false
      )
    );
  }, [height, maxHeight, duration, delay]);

  const animStyle = useAnimatedStyle(() => ({ height: height.value }));

  return (
    <Animated.View
      style={[
        styles.bar,
        animStyle,
        { backgroundColor: 'rgba(255,255,255,0.8)' },
      ]}
    />
  );
}

const suggestions = ['Set an alarm', 'Open WhatsApp', 'Call John'];

export default function ListeningScreen({ onClose }: { onClose: () => void }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          paddingTop: isWeb ? 67 : insets.top,
          paddingBottom: isWeb ? 34 : insets.bottom,
        },
      ]}
    >
      {/* Ambient glow */}
      <View style={styles.glow} />

      {/* Close button */}
      <View style={styles.topRow}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onClose();
          }}
          accessibilityLabel="Stop listening"
          style={({ pressed }) => [
            styles.closeBtn,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Feather name="x" size={20} color={colors.primaryForeground} />
        </Pressable>
      </View>

      {/* Main content */}
      <View style={styles.center}>
        {/* Pulsing mic */}
        <View style={styles.ringWrapper}>
          <PulseRing delay={0} />
          <PulseRing delay={1000} />
          <FloatingMic />
        </View>

        <Text style={[styles.listeningText, { color: colors.primaryForeground }]}>
          Listening…
        </Text>

        {/* Equalizer bars */}
        <View style={styles.equalizer}>
          {BAR_MAX_HEIGHTS.map((h, i) => (
            <EqualizerBar
              key={i}
              maxHeight={h}
              duration={BAR_DURATIONS[i]}
              delay={i * 80}
            />
          ))}
        </View>

        <Text style={styles.exampleText}>
          "Call Mom and turn on the torch"
        </Text>
      </View>

      {/* Suggestion chips */}
      <View style={styles.chips}>
        {suggestions.map((s) => (
          <View key={s} style={styles.chip}>
            <Text style={[styles.chipText, { color: colors.primaryForeground }]}>
              {s}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  glow: {
    position: 'absolute',
    bottom: -80,
    left: '50%',
    marginLeft: -144,
    width: 288,
    height: 288,
    borderRadius: 144,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  ringWrapper: {
    width: 176,
    height: 176,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pulseRing: {
    position: 'absolute',
    width: 176,
    height: 176,
    borderRadius: 88,
  },
  micContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeningText: {
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 24,
  },
  equalizer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 90,
    marginBottom: 32,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    minHeight: 4,
  },
  exampleText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 240,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
});
