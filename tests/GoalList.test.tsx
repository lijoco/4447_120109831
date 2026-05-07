// Taken direct from tutorials
// Small edites were made. ie changed naming convestions. GoalCard instead of Student card. Editied using AI - https://chat.deepseek.com/share/rgozpjt7fdeamxss41
import { render, waitFor } from '@testing-library/react-native';
import IndexScreen from '../app/(tabs)/index';
import { GoalContext } from '../app/_layout';

jest.mock('@/db/client', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return { SafeAreaView: View };
});

// Mock the themed components
jest.mock('@/components/themed-text', () => ({
  ThemedText: 'ThemedText',
  ThemedTextInput: 'ThemedTextInput',
}));

jest.mock('@/components/themed-view', () => ({
  ThemedView: 'ThemedView',
}));

// Mock GoalCard component
jest.mock('@/components/GoalCard', () => 'GoalCard');

// Fake goal data
const mockGoal = {
  id: 1,
  title: 'Test Goal',
  description: 'Learn testing',
  deadline: '2024-12-31',
  count: 0,
};

describe('IndexScreen', () => {
  it('renders the goal and the add button', async () => {
    const { getByText } = render(
      <GoalContext.Provider value={{ goals: [mockGoal], setGoals: jest.fn() }}>
        <IndexScreen />
      </GoalContext.Provider>
    );

    // Checking if the goal title and the add button are visible on the screen.
    // waitFor is used because the data is loaded asynchronously in the useEffect hook in IndexScreen.tsx
    await waitFor(() => {
      expect(getByText('Test Goal')).toBeTruthy();
      expect(getByText('Add Goal')).toBeTruthy();
    });
  });
});