import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Button} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Goal, GoalContext } from '../_layout';

import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { goals as goalsTable } from '@/db/schema';

export default function GoalDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;

  const { goals, setGoals } = context;

  const goal = goals.find(
    (g: Goal) => g.id === Number(id)
  );

  if (!goal) return null;

  const deleteGoal = async () => {
    await db.delete(goalsTable).where(eq(goalsTable.id, Number(id)));
    const rows = await db.select().from(goalsTable);
    setGoals(rows);
    router.back();
  };

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 22 }}>{goal.title}</ThemedText>
      <ThemedText>{goal.description}</ThemedText>
      <ThemedText>{goal.deadline}</ThemedText>

      <Button
        title="Edit"
        onPress={() =>
          router.push({
            pathname: 'goal/edit',
            params: { id }
          })
        }
      />

      <Button title="Delete" onPress={deleteGoal} />
      <Button title="Back" onPress={() => router.back()} />
    </ThemedView>
  );
}
