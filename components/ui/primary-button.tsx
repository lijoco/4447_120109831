import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  compact?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  compact = false,
  disabled = false 
}: PrimaryButtonProps) {
  const primaryBg = useThemeColor({}, 'tint');
  const secondaryBg = useThemeColor({ light: '#E2E8F0', dark: '#334155' }, 'background');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: variant === 'primary' ? primaryBg : secondaryBg },
        compact && styles.compact,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedText 
        style={[
          styles.label,
          variant === 'secondary' && styles.secondaryLabel,
          compact && styles.compactLabel,
        ]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  compact: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryLabel: {
    // ThemedText handles the color
  },
  compactLabel: {
    fontSize: 13,
  },
});