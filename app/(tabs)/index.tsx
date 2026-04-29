import GoalCard from '@/components/GoalCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { Button } from 'react-native';

type Goal = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  count: number;
};

export default function IndexScreen() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "UX", description: "Attend all", deadline: "May", count: 0 },
    { id: 2, title: "AI", description: "Attend all", deadline: "May", count: 0 },
    { id: 3, title: "Mobile Dev", description: "Attend all", deadline: "May", count: 0 },
  ]);

  // Update count for a specific goal
  const updateCount = (id: number, delta: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === id
          // the ... is the spread operator, it creates a new object with all the same properties as goal, but then we override the count property with the new value
          ? { ...goal, count: goal.count + delta }
          : goal
      )
    );
  };

  // Remove Goal
  const removeGoal = (id: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  // Reset all counts to zero
  const resetAll = () => {
    setGoals(prev =>
      prev.map(goal => ({ ...goal, count: 0 }))
    );
  };

// Note: This is a derived value, not state. It will be recalculated on every render.
  const total = goals.reduce((sum, s) => sum + s.count, 0);


  // Return the UI
  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 30, fontWeight: 'bold', marginVertical: 5}}>
        Welcome Rolla
      </ThemedText>
      <ThemedText>Get to Class</ThemedText>

      {/* Count */}
      <ThemedView style={{ marginVertical: 20 }}>
        <ThemedText style={{ fontSize: 20, marginVertical: 5 }}>
          Total Count: {total}
        </ThemedText>
      </ThemedView>

      {/* Reset button */}
      <ThemedView style={{ marginBottom: 20 }}>
        <Button title="Reset All" onPress={resetAll} />
      </ThemedView>
      
      {/* Cards */}
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          id={goal.id}
          GoalTitle={goal.title}
          GoalDescription={goal.description}
          GoalDeadline={goal.deadline}
          count={goal.count}
          onUpdate={updateCount}
          onRemove={removeGoal}
        />
      ))}
    </ThemedView>
  );
}
