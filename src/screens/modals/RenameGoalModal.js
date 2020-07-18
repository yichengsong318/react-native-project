import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { storeContext } from '../../store';
import AppModal from '../../components/AppModal';
import AppInput from '../../components/AppInput';

const RenameGoalModal = ({ navigation }) => {
    const { goalStore } = useContext(storeContext);
    const goal = goalStore.currentGoal;
    const [goalName, setGoalName] = useState(goal.name ? goal.name : '');

    const handleUpdateGoalName = () => {
        if (!goalName) return;

        goalStore.updateGoal(goal, { name: goalName });
    };

    return (
        <AppModal
            style={styles.RenameGoalModal}
            title="Rename Goal"
            onConfirm={handleUpdateGoalName}
            disabled={!goalName}
        >
            <AppInput
                value={goalName}
                placeholder="Goal name"
                onChangeText={setGoalName}
            />
        </AppModal>
    );
};

const styles = StyleSheet.create({
    RenameGoalModal: {
        flex: 1,
    },
});

export default RenameGoalModal;
