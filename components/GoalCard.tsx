import { Button } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type GoalCardProps = {
    id: number;
    GoalTitle: string;
    GoalDescription: string;
    GoalDeadline: string;
    count: number;
    onUpdate: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
    onEdit: (id: number) => void;
};

export default function GoalCard({
    id,
    GoalTitle,
    GoalDescription,
    GoalDeadline,
    count,
    onUpdate,
    onRemove,
    onEdit,

}: GoalCardProps) {
    // UI for each goal card.
    return (
        <ThemedView style={{ marginBottom: 12, padding: 10, borderWidth: 1 }}>
            <ThemedText type='subtitle'> {GoalTitle} </ThemedText>
            <ThemedText> {GoalDescription} </ThemedText>
            <ThemedText> Deadline: {GoalDeadline} </ThemedText>

            <ThemedText style={{ marginVertical: 5 }}> Count: {count} </ThemedText>

            {/* Button +1 */}
            <ThemedView style={{ marginTop: 10 }}>
                <Button title="+1" onPress={() => onUpdate(id, + 1)} />
            </ThemedView>
            {/* Button -1 */}
            <ThemedView style={{ marginTop: 10 }}>
                <Button title="-1" onPress={() => onUpdate(id, - 1)} />
            </ThemedView>

            <ThemedText style={{
                color: count > 0 ? 'green' : count < 0 ? 'red' : 'gray',
            }}
            >
                {count > 0 && 'Positive'}
                {count < 0 && 'Negative'}
                {count === 0 && 'Zero'}
            </ThemedText>

            {/* Edit Button */}
            <ThemedView style={{ marginTop: 10 }}>
                <Button title="Edit" onPress={() => onEdit(id)} />
            </ThemedView>

            {/* Remove Button */}
            <ThemedView style={{ marginTop: 10 }}>
                <Button title="Remove" onPress={() => onRemove(id)} />
            </ThemedView>

        </ThemedView>
    );
}