import GoalCard from '@/components/GoalCard';
import { ThemedText, ThemedTextInput } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { Button, ScrollView } from 'react-native';
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
      <ThemedText>Goals</ThemedText>

      <Button title="Add Goal" onPress={() => router.push({ pathname: '../add' })} />

      {goals.map((goal: Goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
        />
      ))}
    </SafeAreaView>
  );
}