// This is the main screen that displays all goals. It handles:
// 1. Displaying a list of all goals
// 2. Searching/filtering goals by title or description
// 3. Filtering goals by progress count (Not started, 1-3 times, 4+ times)
// 4. Navigating to add a new goal or view goal details

import GoalCard from '@/components/GoalCard';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Goal, GoalContext } from '../_layout';

type Quote = { q: string; a: string };

async function fetchQuote(): Promise<Quote> {
  const res = await fetch('https://zenquotes.io/api/random');
  const data = await res.json();
  return { q: data[0].q, a: data[0].a };
}

export default function IndexScreen() {
  const router = useRouter();
  const context = useContext(GoalContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountFilter, setSelectedCountFilter] = useState('All');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  useEffect(() => {
    fetchQuote()
      .then(setQuote)
      .finally(() => setQuoteLoading(false));
  }, []);

  // If context is null, something went wrong with the provider. Return nothing to prevent crashes.
  if (!context) return null;
  const { goals } = context;

  // Normalise search query by trimming whitespace and converting to lowercase
  // This makes search case-insensitive and ignores leading/trailing spaces
  const normalizedQuery = searchQuery.trim().toLowerCase();

  // DYNAMIC FILTER OPTIONS:
  // Instead of hardcoding filter options, this generatea them from the actual data
  // This ensures that only filters that make sense for current goals are shown
  const countOptions = [
    'All',  // Always show all goals
    ...Array.from(
      new Set(goals.map((goal: Goal) => {
        // Convert numeric count into human-readable categories
        if (goal.count === 0) return 'Not started';
        if (goal.count <= 3) return '1-3 times';
        return '4+ times';
      }))
    )
  ].sort(); // Sort alphabetically for consistent display order

  // FILTERING LOGIC:
  // This combines both search and count filters using AND logic
  // A goal must match BOTH filters to be displayed
  const filteredGoals = goals.filter((goal: Goal) => {
    // SEARCH FILTER: Check if the search query matches title OR description
    // If search is empty (length === 0), show everything
    const matchesSearch = 
      normalizedQuery.length === 0 ||
      goal.title.toLowerCase().includes(normalizedQuery) ||
      goal.description.toLowerCase().includes(normalizedQuery);

    // COUNT FILTER: Check if the goal's count falls into the selected category
    let matchesCount = true; // Default to true for 'All' option
    if (selectedCountFilter === 'Not started') {
      matchesCount = goal.count === 0; 
    } else if (selectedCountFilter === '1-3 times') {
      matchesCount = goal.count >= 1 && goal.count <= 3; 
    } else if (selectedCountFilter === '4+ times') {
      matchesCount = goal.count >= 4;
    }
    // If selectedCountFilter is 'All', matchesCount stays true

    // Goal must satisfy both conditions to be shown
    return matchesSearch && matchesCount;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Goals"
        subtitle={`${goals.length} total goals`}
      />

      <View style={styles.quoteCard}>
        {quoteLoading ? (
          <ActivityIndicator size="small" color="#0A7EA4" />
        ) : quote ? (
          <>
            <ThemedText style={styles.quoteText}>"{quote.q}"</ThemedText>
            <ThemedText style={styles.quoteAuthor}>— {quote.a}</ThemedText>
          </>
        ) : null}
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Add Goal"
          onPress={() => router.push({ pathname: '../add' })}
        />
      </View>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}  // Updates search state on every keystroke
        placeholder="Search by title or description"
        accessibilityLabel="Search goals"
        accessibilityHint="Type to filter your goals by title or description"
        style={styles.searchInput}
      />

      {/* FILTER BUTTONS ROW */}
      {/* Dynamic buttons generated from goals data */}
      <View style={styles.filterRow}>
        {countOptions.map((option) => {
          // Check if this option is currently selected (for styling)
          const isSelected = selectedCountFilter === option;
          return (
            <Pressable
              key={option}  // Unique key for React's list rendering
              accessibilityLabel={`Filter by ${option}`}
              accessibilityRole="button"
              onPress={() => setSelectedCountFilter(option)}  // Update selected filter
              style={[
                styles.filterButton,
                isSelected && styles.filterButtonSelected,  // Highlight selected button
              ]}
            >
              <ThemedText
                style={[
                  styles.filterButtonText,
                  isSelected && styles.filterButtonTextSelected,  // White text when selected
                ]}
              >
                {/* Filter option text */}
                {option}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* SCROLLABLE GOALS LIST OR EMPTY STATE */}
      <ScrollView 
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredGoals.length === 0 ? (
          // EMPTY STATE: Show this message when no goals match the filters
          <ThemedText style={styles.emptyText}>
            No goals match your filters
          </ThemedText>
        ) : (
          // GOALS LIST: Render each goal as a tappable card
          filteredGoals.map((goal: Goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  quoteCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#EAF4F9',
    minHeight: 60,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#1A3C4A',
    marginBottom: 6,
    lineHeight: 20,
  },
  quoteAuthor: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A7EA4',
    textAlign: 'right',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20, 
    paddingHorizontal: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 14,
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterButtonSelected: {
    backgroundColor: '#0A7EA4',
    borderColor: '#0A7EA4',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterButtonTextSelected: {
    color: '#FFFFFF',  // White text on dark background
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
    opacity: 0.7,
  },
});