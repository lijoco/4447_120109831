import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import InfoTag from '@/components/ui/info-tag';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/themed-view';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { goals as goalsTable } from '@/db/schema';
import { GoalContext } from '../_layout';

export default function GoalDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;
  const { goals, setGoals } = context;

  const goal = goals.find((g) => g.id === Number(id));
  if (!goal) return null;

  const deleteGoal = async () => {
    await db.delete(goalsTable).where(eq(goalsTable.id, Number(id)));
    const rows = await db.select().from(goalsTable);
    setGoals(rows);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title={goal.title} subtitle="Goal details" />
      
      <ThemedView style={styles.tags}>
        <InfoTag label="Description" value={goal.description} />
        <InfoTag label="Start Date" value={goal.startDate} />
        <InfoTag label="End Date" value={goal.endDate} />
        <InfoTag label="Progress" value={`${goal.targetCount} times`} />
      </ThemedView>

      <PrimaryButton
        title="Edit"
        onPress={() =>
          router.push({
            pathname: '/goal/edit',
            params: { id: id }
          })
        }
      />

      <ThemedView style={styles.buttonSpacing}>
        <PrimaryButton title="Delete" variant="danger" onPress={deleteGoal} />
      </ThemedView>
      <ThemedView style={styles.buttonSpacing}>
        <PrimaryButton title="Back" variant="secondary" onPress={() => router.back()} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  buttonSpacing: {
    marginTop: 10,
  },
});