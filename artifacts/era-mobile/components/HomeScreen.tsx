import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import * as Haptics from 'expo-haptics';

// Extracted to avoid calling hooks inside .map()
function PulseRing({ delay, color }: { delay: number; color: string }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.25);

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
      style={[styles.pulseRing, animStyle, { backgroundColor: color }]}
    />
  );
}

type IconLib = 'Feather' | 'MaterialIcons';

type QuickAction = {
  key: string;
  label: string;
  iconLib: IconLib;
  icon: string;
  bgColor: string;
  iconColor: string;
};

const quickActions: QuickAction[] = [
  {
    key: 'call',
    label: 'Call',
    iconLib: 'Feather',
    icon: 'phone',
    bgColor: 'rgba(86,46,178,0.1)',
    iconColor: '#562EB2',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    iconLib: 'Feather',
    icon: 'message-circle',
    bgColor: 'rgba(16,185,129,0.1)',
    iconColor: '#10B981',
  },
  {
    key: 'torch',
    label: 'Torch',
    iconLib: 'MaterialIcons',
    icon: 'flashlight-on',
    bgColor: 'rgba(245,158,11,0.1)',
    iconColor: '#D97706',
  },
  {
    key: 'alarm',
    label: 'Alarm',
    iconLib: 'MaterialIcons',
    icon: 'alarm',
    bgColor: 'rgba(14,165,233,0.1)',
    iconColor: '#0EA5E9',
  },
];

function ActionButton({ action }: { action: QuickAction }) {
  const colors = useColors();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.actionBtn,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      accessibilityLabel={action.label}
    >
      <View style={[styles.actionIcon, { backgroundColor: action.bgColor }]}>
        {action.iconLib === 'Feather' ? (
          <Feather name={action.icon as any} size={20} color={action.iconColor} />
        ) : (
          <MaterialIcons name={action.icon as any} size={20} color={action.iconColor} />
        )}
      </View>
      <Text style={[styles.actionLabel, { color: colors.foreground }]}>
        {action.label}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen({
  onListen,
  onSettings,
}: {
  onListen: () => void;
  onSettings: () => void;
}) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
            Good morning
          </Text>
          <Text style={[styles.appName, { color: colors.foreground }]}>
            ERA Assistant
          </Text>
        </View>
        <Pressable
          onPress={onSettings}
          accessibilityLabel="Open settings"
          style={({ pressed }) => [
            styles.iconBtn,
            {
              backgroundColor: colors.secondary,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Feather name="settings" size={20} color={colors.secondaryForeground} />
        </Pressable>
      </View>

      {/* Greeting card */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primary, marginHorizontal: 20 },
        ]}
      >
        <Text style={styles.cardSub}>How can I help you today?</Text>
        <Text style={[styles.cardBody, { color: colors.primaryForeground }]}>
          Say "Hey ERA" or tap the mic to start a conversation.
        </Text>
      </View>

      {/* Mic button */}
      <View style={styles.micSection}>
        <View style={styles.micWrapper}>
          <PulseRing delay={0} color={colors.primary} />
          <PulseRing delay={1000} color={colors.primary} />
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onListen();
            }}
            accessibilityLabel="Start voice listening"
            style={({ pressed }) => [
              styles.micButton,
              {
                backgroundColor: colors.primary,
                transform: [{ scale: pressed ? 0.94 : 1 }],
              },
            ]}
          >
            <Feather name="mic" size={52} color={colors.primaryForeground} />
          </Pressable>
        </View>
        <Text style={[styles.micHint, { color: colors.mutedForeground }]}>
          Tap to speak
        </Text>
      </View>

      {/* Quick actions */}
      <View style={[styles.quickActions, { paddingBottom: bottomPad + 28 }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Quick actions
        </Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <ActionButton key={action.key} action={action} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  appName: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.5,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 20,
  },
  cardSub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    lineHeight: 22,
  },
  micSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micWrapper: {
    width: 144,
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  micButton: {
    width: 136,
    height: 136,
    borderRadius: 68,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#562EB2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  micHint: {
    marginTop: 28,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  quickActions: {
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
});
