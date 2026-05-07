import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type InfoTagProps = {
  label: string;
  value: number | string;
};

export default function InfoTag({ label, value }: InfoTagProps) {
  const tagBg = useThemeColor({ light: '#EFF6FF', dark: 'rgba(59, 130, 246, 0.2)' }, 'background');

  return (
    <View style={[styles.tag, { backgroundColor: tagBg }]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 999,
    flexDirection: 'row',
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  value: {
    fontSize: 12,
    fontWeight: '500',
  },
});