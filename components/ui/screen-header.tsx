import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../themed-text';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
});