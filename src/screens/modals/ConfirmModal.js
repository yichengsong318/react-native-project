import React from 'react';
import { StyleSheet, Text, YellowBox } from 'react-native';
import AppModal from '../../components/AppModal';
import { colors } from '../../utils/styles';

const ConfirmModal = ({ route }) => {
    const { title, message, onConfirm, confirmText, isDanger } = route.params;
    const confirmBtnColor = isDanger ? colors.danger : null;

    YellowBox.ignoreWarnings([
        'Non-serializable values were found in the navigation state',
    ]);

    return (
        <AppModal
            style={styles.ConfirmModal}
            title={title || 'Are you sure?'}
            onConfirm={onConfirm}
            confirmBtnColor={confirmBtnColor}
            confirmText={confirmText}
        >
            <Text style={styles.message}>{message || ''}</Text>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    ConfirmModal: {
        flex: 1,
    },
    message: {
        fontSize: 16,
    },
});

export default ConfirmModal;
