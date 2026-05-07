import { ThemedTextInput } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { Button, View } from 'react-native';
import { GoalContext } from './_layout';
import {db} from '@/db/client';
import {goals as goalsTable} from '@/db/schema';

export default function AddGoal() {
  const router = useRouter();
  const context = useContext(GoalContext);

  if (!context) return null;
 
  const { setGoals } = context;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const saveGoal = async () => {
    await db.insert(goalsTable).values({
      title,
      description,
      deadline,
      count: 0,
    });

    const rows = await db.select().from(goalsTable);
    setGoals(rows);
    router.back();
  };

  return (

    // It is allowing empty fields to be added, but I will add validation later
    <View style={{ padding: 20 }}>
      <ThemedTextInput placeholder="Goal Title" value={title} onChangeText={setTitle} />
      <ThemedTextInput placeholder="Goal Description" value={description} onChangeText={setDescription} />
      <ThemedTextInput placeholder="Goal Deadline" value={deadline} onChangeText={setDeadline} />

      <Button title="Save" onPress={saveGoal} />
    </View>
  );
}
