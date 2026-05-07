import { ThemedView } from '@/components/themed-view';
import FormField from '@/components/ui/form-field';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { db } from '@/db/client';
import { goals as goalsTable } from '@/db/schema';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalContext } from './_layout';

export default function AddGoal() {
  const router = useRouter();
  const context = useContext(GoalContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!context) return null;
  const { setGoals } = context;

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
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Add Goal" subtitle="Create a new goal to track." />
      <ThemedView style={styles.form}>
        <FormField label="Title" value={title} onChangeText={setTitle} />
        <FormField label="Description" value={description} onChangeText={setDescription} />
        <FormField label="Deadline" value={deadline} onChangeText={setDeadline} />
      </ThemedView>

      <PrimaryButton title="Save Goal" onPress={saveGoal} />
      <ThemedView style={styles.backButton}>
        <PrimaryButton title="Cancel" variant="secondary" onPress={() => router.back()} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginBottom: 6,
  },
  backButton: {
    marginTop: 10,
  },
});