import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import Header from '../../components/Header';
import AppScrollView from '../../components/AppScrollView';
import AppInput from '../../components/AppInput';
import * as appStyles from '../../utils/styles';

const GoalTypeSelection = ({ navigation }) => {
    const { goalStore, userStore } = useContext(storeContext);
    const [type, setType] = useState('todo');
    const [name, setName] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleCreateGoal = async () => {
        if (isPending || !name) return;

        setIsPending(true);

        if (type === 'strive') {
            await goalStore.createStriveGoal({ name, type, startedAt: new Date(), user: userStore.user.id });
            setIsPending(false);

            navigation.replace('GoalStriveSetup');
            return;
        }

        await goalStore.createGoal({ name, type, user: userStore.user.id });
        setIsPending(false);

        navigation.replace('GoalView');
    };

    useEffect(() => {
        setIsPending(false);
    });

    return (
        <View style={styles.GoalTypeSelectionScreen}>
            <Header
                left={{
                    title: 'Cancel',
                    onPress: () => navigation.navigate('GoalList'),
                }}
                right={{
                    title: 'Create',
                    disabled: isPending || !name,
                }}
            />

            <AppScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>What kind of goal do you want to create?</Text>

                    <TouchableOpacity
                        style={[styles.goalType, type === 'todo' ? styles.active : null]}
                        onPress={() => setType('todo')}
                    >
                        <Icon name="tasks" style={styles.icon}/>
                        <View style={styles.goalTypeMain}>
                            <Text style={styles.goalTypeTitle}>Todo</Text>
                            <Text style={styles.goalTypeDesc}>Our standard template is perfect for short-term goals, todo lists, habit tracking or small group project management.</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.goalType, type === 'strive' ? styles.active : null]}
                        onPress={() => setType('strive')}
                    >
                        <Icon name="users" style={styles.icon}/>
                        <View style={styles.goalTypeMain}>
                            <Text style={styles.goalTypeTitle}>STRIVE</Text>
                            <Text style={styles.goalTypeDesc}>Our custom framework designed to increase your chances to achieve your life-changing goals by holding yourself accountable.</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.title}>Name your goal</Text>
                    <AppInput
                        onChangeText={setName}
                        placeholder="Goal name"
                        onSubmitEditing={handleCreateGoal}
                    />
                </View>
            </AppScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    GoalTypeSelectionScreen: {
        flex: 1,
        backgroundColor: appStyles.colors.bg10,
    },
    title: {
        marginHorizontal: 30,
        marginTop: 30,
        marginBottom: 15,
        fontSize: 24,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    goalType: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 30,
        borderWidth: 1,
        borderColor: appStyles.colors.divider,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appStyles.colors.bg00,
        textAlign: 'center',
    },
    goalTypeMain: {
        flex: 1,
    },
    goalTypeTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: appStyles.colors.primary,
    },
    goalTypeDesc: {

    },
    icon: {
        width: 60,
        fontSize: 32,
        color: appStyles.colors.primary,
    },
    active: {
        backgroundColor: appStyles.colors.secondary,
    },
});

export default GoalTypeSelection;
