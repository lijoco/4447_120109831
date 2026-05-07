// components/ui/form-field.tsx
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedTextInput } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedView } from '@/components/themed-view';


type FormFieldProps = {
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
}: FormFieldProps) {
  const labelColor = useThemeColor({ light: '#334155', dark: '#94A3B8' }, 'text');

  return (
    <ThemedView style={[styles.card, {borderRadius:14}]}>

      <ThemedText style={[styles.label, { color: labelColor }]}>
        {label}
      </ThemedText>

      <ThemedTextInput
        accessibilityLabel={label}
        accessibilityHint={`Enter ${label.toLowerCase()}`}
        placeholder={placeholder ?? label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    padding: 16,
    marginBottom: 10,
  },
});