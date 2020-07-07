import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Keyboard } from 'react-native';
import { storeContext } from '../store';
import AppInput from './AppInput';
import * as appStyles from '../utils/styles';

const CommentAddBar = () => {
    const { taskStore } = useContext(storeContext);
    const [message, setMessage] = useState(null);
    const messageInput = useRef(null);

    const handleCreateComment = async () => {
        await taskStore.createComment(message);

        setMessage(null);
        messageInput.current.clear();
        Keyboard.dismiss();
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
            <TouchableOpacity style={styles.button} onPress={handleCreateComment}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    CommentAddBar: {
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
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: appStyles.colors.primary,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CommentAddBar;
