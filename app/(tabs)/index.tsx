import GoalCard from '@/components/GoalCard';
import { ThemedText, ThemedTextInput } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Goal, GoalContext } from '../_layout';

// type Goal = {
//   id: number;
//   title: string;
//   description: string;
//   deadline: string;
//   count: number;
// };

export default function IndexScreen() {

  // New
  const router = useRouter();
  const context = useContext(GoalContext);
  //

  // // Big chunk of old code
  // const [goals, setGoals] = useState<Goal[]>([
  //   { id: 1, title: "UX", description: "Attend all", deadline: "May", count: 0 },
  //   { id: 2, title: "AI", description: "Attend all", deadline: "May", count: 0 },
  //   { id: 3, title: "Mobile Dev", description: "Attend all", deadline: "May", count: 0 },
  // ]);

  // // Form state for adding new goals
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [deadline, setDeadline] = useState('');
  // const [editingId, setEditingId] = useState<number | null>(null);


  // // Update count for a specific goal
  // const updateCount = (id: number, delta: number) => {
  //   setGoals(prev =>
  //     prev.map(goal =>
  //       goal.id === id
  //         // the ... is the spread operator, it creates a new object with all the same properties as goal, but then we override the count property with the new value
  //         ? { ...goal, count: goal.count + delta }
  //         : goal
  //     )
  //   );
  // };

  // // Add a new goal or save updates
  // const saveGoal = () => {
  //   if (!title.trim()) return; // Don't add empty goals

  //   if (editingId) { // When editing, update the existing goal instead of adding a new one
  //     setGoals(prev =>
  //       prev.map(goal =>
  //         goal.id === editingId
  //           ? { ...goal, title, description, deadline }
  //           : goal
  //       )
  //     );
  //     setEditingId(null); // Exit editing mode
  //   } else {
  //     const newGoal : Goal = {
  //       id: Date.now(), // Unique ID based on timestamp
  //       title,
  //       description,
  //       deadline,
  //       count: 0,
  //     };

  //     setGoals(prev => [...prev, newGoal]);
  //   }

  //     // Clear input fields after adding
  //     setTitle('');
  //     setDescription('');
  //     setDeadline('');
  //   };

  //   // Remove Goal
  //   const removeGoal = (id: number) => {
  //     setGoals(prev => prev.filter(goal => goal.id !== id));
  //   };

  //   // Reset all counts to zero
  //   const resetAll = () => {
  //     setGoals(prev =>
  //       prev.map(goal => ({ ...goal, count: 0 }))
  //     );
  //   };

  //   // Note: This is a derived value, not state. It will be recalculated on every render.
  //   const total = goals.reduce((sum, s) => sum + s.count, 0);
  //   // End of big chunk of old code

  // new code
  if (!context) return null;
  const { goals } = context;

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


//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ flex: 1, padding: 10 }}>

//         <ThemedView style={{ padding: 20 }}>
//           <ThemedText type='title' style={{ marginVertical: 5 }}>
//             Welcome Rolla
//           </ThemedText>
//           <ThemedText>Get to Class</ThemedText>

//           {/* Count */}
//           <ThemedView style={{ marginVertical: 20 }}>
//             <ThemedText style={{ fontSize: 20, marginVertical: 5 }}>
//               Total Count: {total}
//             </ThemedText>
//           </ThemedView>

//           {/* Input field for goal title */}
//           <ThemedTextInput
//             placeholder="Goal Title"
//             value={title}
//             onChangeText={setTitle}
//             style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
//           />

//           <ThemedTextInput
//             placeholder="Goal Description"
//             value={description}
//             onChangeText={setDescription}
//             style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
//           />

//           <ThemedTextInput
//             placeholder="Goal Deadline"
//             value={deadline}
//             onChangeText={setDeadline}
//             style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
//           />

//           {/* Add new / update goal button */}
//           <ThemedView style={{ marginVertical: 10 }}>
//             <Button title={editingId ? "Save Changes" : "Add Goal"} onPress={saveGoal} disabled={!title.trim()} />
//           </ThemedView>

//           {/* Reset button */}
//           <ThemedView style={{ marginVertical: 10 }}>
//             <Button title="Reset All" onPress={resetAll} />
//           </ThemedView>

//           {goals.length === 0 ? (
//             <ThemedText style={{ marginTop: 20, fontStyle: 'italic' }}>
//               No goals yet. Add one above!
//             </ThemedText>
//           ) : null}

//           {/* Cards */}
//           {goals.map(goal => (
//             <GoalCard
//               key={goal.id}
//               id={goal.id}
//               GoalTitle={goal.title}
//               GoalDescription={goal.description}
//               GoalDeadline={goal.deadline}
//               count={goal.count}
//               onUpdate={updateCount}
//               onRemove={removeGoal}

//               onEdit={(id) => {
//                 const goal = goals.find(s => s.id === id);
//                 if (!goal) return;

//                 setEditingId(id);
//                 setTitle(goal.title);
//                 setDescription(goal.description);
//                 setDeadline(goal.deadline);
//               }}
//             />
//           ))}
//         </ThemedView>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
