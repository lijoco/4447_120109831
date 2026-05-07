import { Stack } from 'expo-router';
import { createContext, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

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

  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, title: "UX", description: "Attend all", deadline: "May", count: 0 },
    { id: 2, title: "AI", description: "Attend all", deadline: "May", count: 0 },
    { id: 3, title: "Mobile Dev", description: "Attend all", deadline: "May", count: 0 },
  ]);

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