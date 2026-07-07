import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  const colors = useColors();
  const translateX = useSharedValue(on ? 22 : 2);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handlePress = () => {
    const next = !on;
    setOn(next);
    translateX.value = withTiming(next ? 22 : 2, { duration: 200 });
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      style={[
        styles.toggle,
        { backgroundColor: on ? colors.primary : colors.border },
      ]}
    >
      <Animated.View style={[styles.thumb, thumbStyle]} />
    </Pressable>
  );
}

type IconLib = 'Feather' | 'MaterialIcons';

type RowItem = {
  key: string;
  label: string;
  desc: string;
  iconLib: IconLib;
  icon: string;
  iconBg: string;
  iconColor: string;
  defaultOn?: boolean;
};

const featureRows: RowItem[] = [
  {
    key: 'call',
    label: 'Call',
    desc: 'Voice-dial contacts',
    iconLib: 'Feather',
    icon: 'phone',
    iconBg: 'rgba(86,46,178,0.1)',
    iconColor: '#562EB2',
    defaultOn: true,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    desc: 'Send messages hands-free',
    iconLib: 'Feather',
    icon: 'message-circle',
    iconBg: 'rgba(16,185,129,0.1)',
    iconColor: '#10B981',
    defaultOn: true,
  },
  {
    key: 'torch',
    label: 'Torch',
    desc: 'Toggle the flashlight',
    iconLib: 'MaterialIcons',
    icon: 'flashlight-on',
    iconBg: 'rgba(245,158,11,0.1)',
    iconColor: '#D97706',
    defaultOn: true,
  },
  {
    key: 'alarm',
    label: 'Alarm',
    desc: 'Set alarms by voice',
    iconLib: 'MaterialIcons',
    icon: 'alarm',
    iconBg: 'rgba(14,165,233,0.1)',
    iconColor: '#0EA5E9',
  },
];

const prefRows: RowItem[] = [
  {
    key: 'wake',
    label: 'Wake word',
    desc: '"Hey ERA" detection',
    iconLib: 'Feather',
    icon: 'mic',
    iconBg: 'rgba(86,46,178,0.1)',
    iconColor: '#562EB2',
    defaultOn: true,
  },
  {
    key: 'voice',
    label: 'Voice feedback',
    desc: 'Spoken responses',
    iconLib: 'Feather',
    icon: 'volume-2',
    iconBg: 'rgba(86,46,178,0.1)',
    iconColor: '#562EB2',
    defaultOn: true,
  },
  {
    key: 'dark',
    label: 'Dark mode',
    desc: 'Use a darker theme',
    iconLib: 'Feather',
    icon: 'moon',
    iconBg: 'rgba(86,46,178,0.1)',
    iconColor: '#562EB2',
  },
];

const linkRows = [
  { key: 'privacy', label: 'Privacy & permissions', icon: 'shield' },
  { key: 'about', label: 'About ERA', icon: 'info' },
];

// Extracted component so hooks are called at component level, not inside .map()
function ToggleRow({
  item,
  isLast,
}: {
  item: RowItem;
  isLast: boolean;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <View style={[styles.rowIcon, { backgroundColor: item.iconBg }]}>
        {item.iconLib === 'Feather' ? (
          <Feather name={item.icon as any} size={20} color={item.iconColor} />
        ) : (
          <MaterialIcons
            name={item.icon as any}
            size={20}
            color={item.iconColor}
          />
        )}
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, { color: colors.foreground }]}>
          {item.label}
        </Text>
        <Text
          style={[styles.rowDesc, { color: colors.mutedForeground }]}
          numberOfLines={1}
        >
          {item.desc}
        </Text>
      </View>
      <Toggle defaultOn={item.defaultOn} />
    </View>
  );
}

export default function SettingsScreen({ onBack }: { onBack: () => void }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const topPad = isWeb ? 67 : insets.top;
  const bottomPad = isWeb ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 8 }]}>
        <Pressable
          onPress={onBack}
          accessibilityLabel="Go back"
          style={({ pressed }) => [
            styles.iconBtn,
            {
              backgroundColor: colors.secondary,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Feather
            name="chevron-left"
            size={22}
            color={colors.secondaryForeground}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomPad + 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>
              A
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.foreground }]}>
              Alex Morgan
            </Text>
            <Text style={[styles.profileSub, { color: colors.mutedForeground }]}>
              ERA Premium
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
        </View>

        {/* Features */}
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Features
        </Text>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {featureRows.map((item, i) => (
            <ToggleRow
              key={item.key}
              item={item}
              isLast={i === featureRows.length - 1}
            />
          ))}
        </View>

        {/* Preferences */}
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Preferences
        </Text>
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          {prefRows.map((item, i) => (
            <ToggleRow
              key={item.key}
              item={item}
              isLast={i === prefRows.length - 1}
            />
          ))}
        </View>

        {/* Links */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.border, marginTop: 20 },
          ]}
        >
          {linkRows.map((r, i) => (
            <Pressable
              key={r.key}
              style={({ pressed }) => [
                styles.linkRow,
                i < linkRows.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View
                style={[styles.rowIcon, { backgroundColor: colors.secondary }]}
              >
                <Feather
                  name={r.icon as any}
                  size={20}
                  color={colors.secondaryForeground}
                />
              </View>
              <Text style={[styles.linkLabel, { color: colors.foreground }]}>
                {r.label}
              </Text>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.mutedForeground}
              />
            </Pressable>
          ))}
        </View>

        <Text style={[styles.version, { color: colors.mutedForeground }]}>
          ERA AI Assistant · v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.3,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
  },
  profileSub: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  section: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: { flex: 1 },
  rowLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  rowDesc: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  linkLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 24,
  },
});
