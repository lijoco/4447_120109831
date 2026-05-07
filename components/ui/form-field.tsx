// components/FormField.tsx
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { ThemedTextInput } from '../themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
};

export default function FormField({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default'
}: Props) {
  const labelColor = useThemeColor({ light: '#334155', dark: '#94A3B8' }, 'text');

  return (
    <View style={styles.wrapper}>
      <ThemedText style={[styles.label, { color: labelColor }]}>
        {label}
      </ThemedText>
      <ThemedTextInput
        placeholder={placeholder ?? label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});