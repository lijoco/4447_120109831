import { ThemedTextInput } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, View } from 'react-native';
import { GoalContext } from './_layout';

export default function AddGoal() {
  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;
 
  const { goals, setGoals } = context;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const saveGoal = () => {
    const newGoal = {
      id: Date.now(),
      title,
      description,
      deadline,
      count: 0,
    };

    setGoals([...goals, newGoal]);
    router.back();
  };

  return (
    <View style={{ padding: 20 }}>
      <ThemedTextInput placeholder="Goal Title" value={title} onChangeText={setTitle} />
      <ThemedTextInput placeholder="Goal Description" value={description} onChangeText={setDescription} />
      <ThemedTextInput placeholder="Goal Deadline" value={deadline} onChangeText={setDeadline} />

      <Button title="Save" onPress={saveGoal} />
    </View>
  );
}
