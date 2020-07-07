import React, { useContext } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store'
import UserAvatar from './UserAvatar';
import { formatDateDistance } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const CommentItem = ({ comment }) => {
    const { taskStore, userStore } = useContext(storeContext);
    const userOwnsComment = userStore.user.id === comment.user.id;

    const handleDeleteComment = () => {
        if (!userOwnsComment) return;

        Alert.alert(
            'Delete Comment',
            'Are you sure you want to delete this comment?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => taskStore.removeComment(comment),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.CommentItem}>
            <UserAvatar user={comment.user}/>
            <View style={styles.main}>
                <View style={styles.mainHeader}>
                    <Text style={styles.name} numberOfLines={1}>{comment.user.firstName} {comment.user.lastName}</Text>
                    { userOwnsComment ?
                        <TouchableOpacity onPress={handleDeleteComment}>
                            <Icon name="trash" size={14} style={styles.buttonText}/>
                        </TouchableOpacity> : null
                    }
                </View>
                <Text style={styles.message}>{comment.message}</Text>
                <Text style={styles.meta}>{formatDateDistance(comment.createdAt)}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    CommentItem: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 5,
    },
    main: {
        flex: 1,
        marginLeft: 10,
    },
    mainHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontWeight: 'bold',
    },
    meta: {
        marginTop: 5,
        color: appStyles.colors.muted,
        fontSize: 12,
    },
    buttonText: {
        color: appStyles.colors.muted,
    },
});

export default CommentItem;
