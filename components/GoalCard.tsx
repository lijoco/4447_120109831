import { useRouter } from 'expo-router';
import { Goal } from '@/app/_layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import PrimaryButton from './ui/primary-button';
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

    return (
        <ThemedView style={[styles.card, { borderColor: cardBorder }]}>
            <Pressable onPress={openDetails}>
                <ThemedText style={styles.title}>{goal.title}</ThemedText>
            </Pressable>

            <ThemedView style={styles.tags}>
                <InfoTag label="Description" value={goal.description} />
                <InfoTag label="Deadline" value={goal.deadline} />
            </ThemedView>

            <PrimaryButton
                compact 
                title="View Details"
                onPress={openDetails}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
        padding: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 12,
    },
});