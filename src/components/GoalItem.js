import React, { useContext, useRef } from 'react';
import { StyleSheet, Animated, Alert, Platform, TouchableOpacity } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InfoBox from '../components/InfoBox';
import GoalPartners from '../components/GoalPartners';
import { storeContext } from '../store'
import * as appStyles from '../utils/styles';

const AnimatedIcon = Animated.createAnimatedComponent(Icon, { useNativeDriver: true });

const GoalItem = ({ onPress, goal }) => {
    const store = useContext(storeContext);
    const swipeableGoal = useRef(null);

    const deleteGoal = () => {
        Alert.alert(
            'Delete Goal',
            'Are you sure you want to delete this goal?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => swipeableGoal.current.close(),
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
            ref={swipeableGoal}
            friction={3}
            rightThreshold={60}
            renderRightActions={renderRightActions}
        >
            <InfoBox
                onPress={onPress}
                title={goal.name}
                subtitle={goal.type.toUpperCase()}
            >
                <GoalPartners goal={goal} hideMenu/>
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
