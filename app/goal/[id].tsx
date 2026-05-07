import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext } from 'react';
import { Button} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Goal, GoalContext } from '../_layout';

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

  const deleteGoal = () => {
    setGoals(goals.filter(g => g.id !== Number(id)));
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
            pathname: '../goal/[id]/edit',
            params: { id }
          })
        }
      />

      <Button title="Delete" onPress={deleteGoal} />
      <Button title="Back" onPress={() => router.back()} />
    </ThemedView>
  );
}
