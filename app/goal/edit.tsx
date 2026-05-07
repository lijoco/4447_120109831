import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import FormField from '@/components/ui/form-field';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { goals as goalsTable } from '@/db/schema';
import { GoalContext } from '../_layout';

export default function EditGoal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const context = useContext(GoalContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const goal = context?.goals.find((g) => g.id === Number(id));

  useEffect(() => {
    if (!goal) return;
    setTitle(goal.title);
    setDescription(goal.description);
    setStartDate(goal.startDate);
    setEndDate(goal.endDate);
  }, [goal]);

  if (!context || !goal) return null;

  const { setGoals } = context;

  const saveChanges = async () => {
    await db
      .update(goalsTable)
      .set({ title, description, startDate, endDate })
      .where(eq(goalsTable.id, Number(id)));
    
    const rows = await db.select().from(goalsTable);
    setGoals(rows);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader title="Edit Goal" subtitle={`Update ${goal.title}`} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <FormField label="Title" value={title} onChangeText={setTitle} />
          <FormField label="Description" value={description} onChangeText={setDescription} />
          <FormField label="Start Date" value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" />
          <FormField label="End Date" value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" />
        </View>

        <PrimaryButton title="Save Changes" onPress={saveChanges} />
        <View style={styles.buttonSpacing}>
          <PrimaryButton title="Cancel" variant="secondary" onPress={() => router.back()} />
        </View>
      </ScrollView>
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
  buttonSpacing: {
    marginTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
});