import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store';
import AppInput from './AppInput';
import InputPhoto from './InputPhoto';
import * as appStyles from '../utils/styles';

const CommentAddBar = () => {
    const navigation = useNavigation();
    const { taskStore, userStore } = useContext(storeContext);
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState(null);
    const messageInput = useRef(null);

    const handleCreateComment = async () => {
        setIsPending(true);

        await taskStore.createComment(message);

        setIsPending(false);
        setMessage(null);
        messageInput.current.clear();
        Keyboard.dismiss();
    };

    const handleUploadImage = async (file) => {
        if (!file) return;

        await taskStore.uploadAttachment(taskStore.currentTask, file);
    };

    const handleViewPremium = () => {
        showMessage({ message: 'Get Strive2Goal Premium for image uploads', type: 'warning' });

        navigation.navigate('Modal', { screen: 'PremiumModal' });
    };

    return (
        <View style={styles.CommentAddBar}>
            <AppInput
                ref={messageInput}
                style={styles.input}
                onChangeText={setMessage}
                placeholder="write a comment..."
                onSubmitEditing={handleCreateComment}
            />
            {userStore.isPremium ? (
                <InputPhoto onChange={handleUploadImage}>
                    <Icon name="paperclip" size={20} style={styles.photoIcon}/>
                </InputPhoto>
            ) : (
                <TouchableOpacity onPress={handleViewPremium}>
                    <Icon name="paperclip" size={20} style={styles.photoIcon}/>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={[styles.button, isPending || !message ? styles.disabled : null]}
                onPress={handleCreateComment}
                disabled={isPending || !message}
            >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    CommentAddBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: appStyles.colors.primary,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    photoIcon: {
        paddingHorizontal: 3,
        marginRight: appStyles.goals.gutter,
        color: appStyles.colors.muted,
    },
    disabled: {
        backgroundColor: appStyles.colors.muted,
    },
});

export default CommentAddBar;
