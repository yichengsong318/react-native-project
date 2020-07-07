import React, { useContext } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../store'
import UserAvatar from './UserAvatar';
import { formatDateDistance } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const AttachmentItem = ({ attachment }) => {
    const { taskStore, userStore } = useContext(storeContext);
    const userOwnsAttachment = userStore.user.id === attachment.user.id;

    const handleDeleteAttachment = () => {
        if (!userOwnsAttachment) return;

        Alert.alert(
            'Delete Image',
            'Are you sure you want to delete this image?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => taskStore.removeAttachment(attachment),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={styles.AttachmentItem}>
            <UserAvatar user={attachment.user}/>
            <View style={styles.main}>
                <View style={styles.mainHeader}>
                    <Text style={styles.name} numberOfLines={1}>{attachment.user.firstName} {attachment.user.lastName}</Text>
                    { userOwnsAttachment ?
                        <TouchableOpacity onPress={handleDeleteAttachment}>
                            <Icon name="trash" size={14} style={styles.buttonText}/>
                        </TouchableOpacity> : null
                    }
                </View>
                <Image style={styles.image} source={{ uri: attachment.url }}/>
                <Text style={styles.meta}>{formatDateDistance(attachment.createdAt)}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    AttachmentItem: {
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
    image: {
        width: '100%',
        aspectRatio: 1,
        maxHeight: 200,
    },
});

export default AttachmentItem;
