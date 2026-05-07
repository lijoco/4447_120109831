import { useRouter } from 'expo-router';
import { Goal } from '@/app/_layout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from 'react-native';

type GoalCardProps = {
    goal: Goal;
};

export default function GoalCard({ goal }: GoalCardProps) {
    const router = useRouter();


    // UI for each goal card.
    return (
        <ThemedView style={{ marginBottom: 12, padding: 10, borderWidth: 1 }}>
            <ThemedText type='subtitle'
                onPress={() =>
                    router.push({ pathname: '/goal/[id]', params: { id: goal.id.toString() } })}
            > {goal.title} </ThemedText>
            <ThemedText> {goal.description} </ThemedText>
            <ThemedText> Deadline: {goal.deadline} </ThemedText>

            <Button
            title="View"
            onPress={() =>
                router.push({ pathname: '/goal/[id]', params: {id: goal.id.toString() }})
            }/>

        </ThemedView>
    );
}