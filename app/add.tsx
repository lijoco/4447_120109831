import { ThemedView } from '@/components/themed-view';
import FormField from '@/components/ui/form-field';
import PrimaryButton from '@/components/ui/primary-button';
import ScreenHeader from '@/components/ui/screen-header';
import { db } from '@/db/client';
import { goals as goalsTable, categories as categoriesTable } from '@/db/schema';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoalContext } from './_layout';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type Category = {
  id: number;
  name: string;
  userId: number;
};

export default function AddGoal() {
  const router = useRouter();
  const context = useContext(GoalContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [targetCount, setTargetCount] = useState('1');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const selectedBg = useThemeColor({}, 'tint');
  const unselectedBorder = useThemeColor({ light: '#94A3B8', dark: '#475569' }, 'background');

  useEffect(() => {
    const loadCategories = async () => {
      const rows = await db.select().from(categoriesTable);
      setCategories(rows);
      if (rows.length > 0) setSelectedCategoryId(rows[0].id);
    };
    void loadCategories();
  }, []);

  if (!context) return null;
  const { setGoals } = context;

  const saveGoal = async () => {
    if (!selectedCategoryId) return;
    if (!title.trim() || !description.trim() || !startDate.trim() || !endDate.trim()) {
      alert('Please fill in all fields');
      return;
    }

    await db.insert(goalsTable).values({
      title: title.trim(),
      description: description.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      targetCount: Number(targetCount) || 1,
      categoryId: selectedCategoryId,
      userId: 1,
    });

    const rows = await db.select().from(goalsTable);
    setGoals(rows);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader title="Add Goal" subtitle="Create a new goal to track." />

          <FormField label="Title" value={title} onChangeText={setTitle} />
          <FormField label="Description" value={description} onChangeText={setDescription} />
          <FormField
            label="Start Date"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="YYYY-MM-DD"
          />
          <FormField
            label="End Date"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="YYYY-MM-DD"
          />
          <FormField
            label="Target Count"
            value={targetCount}
            onChangeText={setTargetCount}
            keyboardType="numeric"
          />

          {/* Category Picker */}
          <ThemedView style={styles.categorySection}>
            <ThemedText style={styles.categoryLabel}>Category</ThemedText>
            <View style={styles.categoryRow}>
              {categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => setSelectedCategoryId(cat.id)}
                    accessibilityLabel={`Select category ${cat.name}`}
                    accessibilityRole="button"
                    style={[
                      styles.categoryChip,
                      { borderColor: unselectedBorder },
                      isSelected && { backgroundColor: selectedBg, borderColor: selectedBg },
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat.name}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </ThemedView>

          <PrimaryButton title="Save Goal" onPress={saveGoal} />
          <ThemedView style={styles.backButton}>
            <PrimaryButton title="Cancel" variant="secondary" onPress={() => router.back()} />
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginTop: 10,
  },
  categorySection: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 14,
  },
  categoryLabel: {
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
});