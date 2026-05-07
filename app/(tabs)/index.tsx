import GoalCard from '@/components/GoalCard';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Goal, GoalContext } from '../_layout';


export default function IndexScreen() {

  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;
  const { goals } = context;

  // Must add back in scroll view
  // Return the UI
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="Goals" subtitle="Manage your goals" />


      <PrimaryButton title="Add Goal" onPress={() => router.push({ pathname: '../add' })} />

        <ScrollView contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
      {goals.map((goal: Goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
        />
      ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});