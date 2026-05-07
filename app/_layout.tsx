import { Stack } from 'expo-router';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { db } from '@/db/client';
import { goals as goalsTable } from '@/db/schema';
import { seedGoalsIfEmpty } from '@/db/seed';


export const unstable_settings = {
  anchor: '(tabs)',
};

export type Goal = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  count: number;
};

type GoalContextType = {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
};

export const GoalContext = createContext<GoalContextType | null>(null);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [goals, setGoals] = useState<Goal[]>([]);

  // Add useEffect on mount to load data from SQLite
  useEffect(() => {
    const loadGoals = async () => {
      await seedGoalsIfEmpty(); // Ensure the database is seeded
      const rows = await db.select().from(goalsTable);
      setGoals(rows);
    };

    void loadGoals();
  }, []);

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    //   </Stack>
    //   <StatusBar style="auto" />
    // </ThemeProvider>

    <GoalContext.Provider value={{ goals, setGoals }}>
      <Stack>
        {/* if you change (tabs) to index then tabs appears top rhs corner */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
        <Stack.Screen name="index" options={{ title: 'Goals' }} />
        {/* <Stack.Screen name="index" options={{ title: 'Me' }} /> */}
      </Stack>
    </GoalContext.Provider>
  );
}