import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

const UserAvatar = (props) => {
    const user = props.user;
    const userInitials = user.firstName[0] + user.lastName[0];

    const size = props.size || 'md';
    const sizes = {
        sm: 30,
        md: 40,
        lg: 60,
    };

    const avatarColor = () => {
        const fullName = `${user.firstName} ${user.lastName}`;
        const colors = [
            '#cF5600',
            '#9857bc',
            '#808c8d',
            '#317ebe',
            '#efc500',
            '#44cc63',
        ];

        let hash = 0;
        for (let i = 0; i < fullName.length; i++){
            hash += fullName.charCodeAt(i);
        }

        return colors[hash % colors.length];
    };

    const avatarStyles = {
        width: sizes[size],
        height: sizes[size],
        borderRadius: sizes[size] / 2,
        backgroundColor: avatarColor(),
    };

    const avatarTextStyles = {
        fontSize: sizes[size] / 2.5,
    };

    return (
        <View style={[styles.UserAvatar, avatarStyles, props.style]}>
            {user.avatar ?
                <Image
                    style={[avatarStyles, styles.img]}
                    source={{ uri: user.avatar }}
                /> :
                <View style={[avatarStyles, styles.noAvatar]}>
                    <Text style={[styles.avatarText, avatarTextStyles]}>{userInitials}</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    UserAvatar: {
        backgroundColor: '#ccc',
    },
    img: {
        resizeMode: 'cover',
    },
    noAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default UserAvatar
