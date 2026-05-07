// components/ui/primary-button.tsx
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  compact?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  compact = false,
  variant = 'primary',
  disabled = false,
}: PrimaryButtonProps) {
  const primaryBg = useThemeColor({}, 'tint');
  const secondaryBg = useThemeColor({ light: '#F8FAFC', dark: '#1E293B' }, 'background');
  const dangerBg = useThemeColor({ light: '#dc0606', dark: '#7F1D1D' }, 'background');
  
  const secondaryBorder = useThemeColor({ light: '#94A3B8', dark: '#475569' }, 'border');
  const dangerBorder = useThemeColor({ light: '#FCA5A5', dark: '#991B1B' }, 'border');
  
  const secondaryTextColor = useThemeColor({ light: '#0F172A', dark: '#ECEDEE' }, 'text');
  const dangerTextColor = useThemeColor({ light: 'white', dark: '#FCA5A5' }, 'text');

  const getBackgroundColor = () => {
    if (disabled) return { opacity: 0.5 };
    if (variant === 'primary') return { backgroundColor: primaryBg };
    if (variant === 'secondary') return { backgroundColor: secondaryBg };
    if (variant === 'danger') return { backgroundColor: dangerBg };
    return { backgroundColor: primaryBg };
  };

  const getBorderStyles = () => {
    if (variant === 'secondary') return { borderColor: secondaryBorder, borderWidth: 1 };
    if (variant === 'danger') return { borderColor: dangerBorder, borderWidth: 1 };
    return {};
  };

  const getTextColor = () => {
    if (variant === 'secondary') return { color: secondaryTextColor };
    if (variant === 'danger') return { color: dangerTextColor };
    return {};
  };

  return (
    <Pressable
      accessibilityLabel={title}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getBackgroundColor(),
        getBorderStyles(),
        compact && styles.compact,
        pressed && styles.pressed,
      ]}
    >
      <ThemedText
        style={[
          styles.label,
          getTextColor(),
          compact && styles.compactLabel,
        ]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  compact: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  compactLabel: {
    fontSize: 13,
  },
});