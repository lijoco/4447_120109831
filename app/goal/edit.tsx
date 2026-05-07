import { ThemedTextInput } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, } from 'react-native';
import { Goal, GoalContext } from '../_layout';

export default function EditGoal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;

  const { goals, setGoals } = context;

  const goal = goals.find(
    (s: Goal) => s.id === Number(id)
  );

  if (!goal) return null;

  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [deadline, setDeadline] = useState(goal.deadline);

  const saveChanges = () => {
    setGoals(
      goals.map(s =>
        s.id === Number(id)
          ? { ...s, title, description, deadline }
          : s
      )
    );

    router.back();
  };

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedTextInput value={title} onChangeText={setTitle} />
      <ThemedTextInput value={description} onChangeText={setDescription} />
      <ThemedTextInput value={deadline} onChangeText={setDeadline} />

      <Button title="Save Changes" onPress={saveChanges} />
    </ThemedView>
  );
}