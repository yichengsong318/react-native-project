import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store';
import AppInput from './AppInput';
import * as appStyles from '../utils/styles';

const TaskAddBar = () => {
    const { goalStore, taskStore, userStore } = useContext(storeContext);
    const [name, setName] = useState(null);
    const nameInput = useRef(null);

    const handleCreateTask = async () => {
        await taskStore.createTask({
            name,
            goal: goalStore.currentGoal.id,
            user: userStore.user.id,
        });

        setName(null);
        nameInput.current.clear();
        Keyboard.dismiss();
    };

    return (
        <View style={styles.TaskAddBar}>
            <AppInput
                ref={nameInput}
                style={styles.input}
                onChangeText={setName}
                placeholder="I want to..."
                onSubmitEditing={handleCreateTask}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
                <Icon name="plus" size={20} style={styles.buttonIcon}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    TaskAddBar: {
        flex: 1,
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        padding: appStyles.goals.gutter,
        marginRight: appStyles.goals.gutter,
        height: 40,
        borderRadius: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: appStyles.colors.primary,
    },
    buttonIcon: {
        color: '#fff',
    },
});

export default TaskAddBar;
