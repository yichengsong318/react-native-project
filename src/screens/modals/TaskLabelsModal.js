import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import AppModal from '../../components/AppModal';
import * as appStyles from '../../utils/styles';

const TaskLabelsModal = ({ navigation }) => {
    const { taskStore } = useContext(storeContext);
    const task = taskStore.currentTask;
    const [labels, setLabels] = useState(task.labels ? task.labels : []);

    const handleAddLabel = async (color) => {
        let newLabels = [...labels, color];

        const labelExisted = labels.find((c) => c === color);
        if (labelExisted) {
            // Removes selected color if it already exists in database
            newLabels = labels.filter((c) => c !== color);
        }

        setLabels(newLabels);
        await taskStore.updateTask(task, { labels: newLabels })
    };

    return (
        <AppModal
            style={styles.TaskLabelsModal}
            title="Add Labels"
            cancelText="Close"
            hideConfirmBtn={true}
        >
            {Object.entries(appStyles.labelColors).map(([colorName, color]) => (
                <TouchableOpacity
                    key={colorName}
                    style={[styles.label, { backgroundColor: color }]}
                    onPress={() => handleAddLabel(colorName)}
                >
                    <View style={styles.iconBox}>
                        {labels.find(c => c === colorName) ? (
                            <Icon name="check" size={16} style={styles.icon}/>
                        ) : null}
                    </View>
                </TouchableOpacity>
            ))}
        </AppModal>
    );
};

const styles = StyleSheet.create({
    TaskLabelsModal: {
        flex: 1,
    },
    label: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
    },
    iconBox: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: appStyles.general.borderRadius,
        marginLeft: 10,
    },
    icon: {
        color: '#fff',
    },
});

export default TaskLabelsModal;
