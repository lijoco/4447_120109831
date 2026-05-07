// components/GoalCard.tsx
import { useRouter } from 'expo-router';
import { Goal } from '@/app/_layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import InfoTag from './ui/info-tag';

type GoalCardProps = {
    goal: Goal;
};

export default function GoalCard({ goal }: GoalCardProps) {
    const router = useRouter();
    const cardBorder = useThemeColor({ light: '#E2E8F0', dark: '#334155' }, 'background');

    const openDetails = () => {
        router.push({ pathname: '/goal/[id]', params: { id: goal.id.toString() } });
    };

    // Create accessibility label for screen readers
    const goalSummary = `${goal.title}, ${goal.description}, Deadline: ${goal.deadline}, Progress: ${goal.count} times`;

    return (
        <ThemedView style={[styles.card, { borderColor: cardBorder }]}>
            <Pressable
                accessibilityLabel={`${goalSummary}, view details`}
                accessibilityRole="button"
                onPress={openDetails}
                style={({ pressed }) => [
                    styles.pressable,
                    pressed && styles.pressablePressed,
                ]}
            >
                <ThemedText style={styles.title}>{goal.title}</ThemedText>
                
                <ThemedView style={styles.tags}>
                    <InfoTag label="Description" value={goal.description} />
                    <InfoTag label="Deadline" value={goal.deadline} />
                    <InfoTag label="Progress" value={`${goal.count} times`} />
                </ThemedView>
            </Pressable>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
        overflow: 'hidden',
    },
    pressable: {
        padding: 14,
    },
    pressablePressed: {
        opacity: 0.88,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
});