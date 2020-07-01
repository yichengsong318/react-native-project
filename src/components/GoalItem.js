import React, { useContext, useRef } from 'react';
import { StyleSheet, Animated, Text, Alert, Platform, TouchableOpacity } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InfoBox from '../components/InfoBox';
import { storeContext } from '../store'
// import { formatDate } from '../utils/formatting';
import * as appStyles from '../utils/styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const GoalItem = ({ onPress, goal }) => {
    const store = useContext(storeContext);
    const swipeableTicket = useRef(null);

    const deleteGoal = () => {
        Alert.alert(
            'Delete Goal',
            'Are you sure you want to delete this goal?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => swipeableTicket.current.close(),
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => store.goalStore.removeGoal(goal),
                },
            ],
            { cancelable: false },
        );
    }

    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const ButtonComponent = Platform.OS === 'ios' ? TouchableOpacity : RectButton;
        return (
            <ButtonComponent style={styles.rightAction} onPress={deleteGoal}>
                <AnimatedIcon
                    name="trash"
                    size={20}
                    color="#fff"
                    style={[styles.actionIcon, { transform: [{ scale }] }]}
                />
            </ButtonComponent>
        );
    }

    return (
        <Swipeable
            ref={swipeableTicket}
            friction={3}
            rightThreshold={60}
            renderRightActions={renderRightActions}
        >
            <InfoBox
                onPress={onPress}
                title={goal.name}
                subtitle={goal.type.toUpperCase()}
            >
                <Text>Partners</Text>
            </InfoBox>
        </Swipeable>
    )
};

const styles = StyleSheet.create({
    actionIcon: {
        width: 20,
        marginHorizontal: 10,
    },
    rightAction: {
        alignItems: 'flex-end',
        backgroundColor: appStyles.colors.danger,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
});

export default GoalItem;
