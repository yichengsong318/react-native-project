import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { storeContext } from '../../store';
import Header from '../../components/Header';
import StriveAcronym from '../../components/StriveAcronym';
import AppScrollView from '../../components/AppScrollView';
import AppInput from '../../components/AppInput';
import InputDate from '../../components/InputDate';
import InputTextarea from '../../components/InputTextarea';
import * as appStyles from '../../utils/styles';
import AppButton from '../../components/AppButton';

const GoalStriveSetup = ({ navigation }) => {
    const store = useContext(storeContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPending, setIsPending] = useState(false);

    const [striveAnswers, setStriveAnswers] = useState([
        {
            letter: 's',
            question: 'What goal do you want to achieve?',
            answer: '',
        },
        {
            letter: 't',
            question: 'When do you want to achieve this goal?',
            answer: '',
        },
        {
            letter: 'r',
            question: 'What do you want your end result to be?',
            answer: '',
        },
        {
            letter: 'i',
            question: 'Will this help you? How so?',
            answer: '',
        },
        {
            letter: 'v',
            question: 'Who will you share this with?',
            answer: '',
        },
        {
            letter: 'e',
            question: 'What sacrifices are you ready to make to achieve your STRIVE Goal?',
            answer: '',
        },
    ]);

    const handleCreateStriveGoal = async () => {
        const isInvalid = striveAnswers.filter(({ answer }) => !answer);
        if (isInvalid.length) {
            showMessage({ message: 'Some questions have not been answered yet', type: 'warning' });
            return;
        }

        setIsPending(true);
        await handleSaveGoal(true);
        setIsPending(false);

        navigation.replace('GoalView');
    };

    const handleSaveGoal = async (isComplete) => {
        const cloneGoal = _.cloneDeep(store.goalStore.currentGoal);

        setIsPending(true);
        await store.goalStore.updateGoal(cloneGoal, {
            goalStrive: {
                striveAnswers: striveAnswers.filter(({ answer }) => answer),
                dueDate: isComplete ? striveAnswers[1].answer : null,
                inSetup: isComplete ? false : true,
            },
        });
        setIsPending(false);
    };

    const handleSaveAndExit = async () => {
        await handleSaveGoal();
        navigation.replace('GoalList');
    };

    const prev = () => {
        if (activeIndex === 0) return;
        setActiveIndex(activeIndex - 1);
    };

    const next = async () => {
        await handleSaveGoal();
        setActiveIndex(activeIndex + 1);
    };

    const handleOnChangeValue = (value) => {
        const cloneStriveAnswers = _.cloneDeep(striveAnswers);
        cloneStriveAnswers[activeIndex].answer = value;
        setStriveAnswers(cloneStriveAnswers);
    };

    useEffect(() => {
        const cloneStriveAnswers = _.cloneDeep(striveAnswers);
        let lastLetterAnswered = 's';

        if (store.goalStore.currentGoal && store.goalStore.currentGoal.goalStrive) {
            for (const { letter, question, answer} of store.goalStore.currentGoal.goalStrive.striveAnswers) {
                if (!letter) continue;

                const matchingLetter = striveAnswers.find(it => it.letter === letter);
                if (matchingLetter) {
                    const striveIndex = striveAnswers.indexOf(matchingLetter);
                    cloneStriveAnswers[striveIndex].answer = answer;
                }

                lastLetterAnswered = letter;
            }
        }

        setStriveAnswers(cloneStriveAnswers);
        setActiveIndex('strive'.indexOf(lastLetterAnswered));
    }, []);

    useEffect(() => {
        setIsPending(false);
    });

    return (
        <View style={styles.GoalStriveSetupScreen}>
            <Header
                left={{
                    title: 'Cancel',
                    onPress: () => navigation.navigate('GoalList'),
                }}
            />

            <LinearGradient colors={appStyles.goalThemes.strive2goal} style={{ flex: 1 }}>
                <AppScrollView style={styles.container}>
                    <StriveAcronym activeIndex={activeIndex} activeColor="#fff"/>

                    {activeIndex === 0 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[0].question}</Text>

                            <AppInput
                                placeholder="Type your answer here..."
                                value={striveAnswers[0].answer}
                                onChangeText={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Example: Instead of choosing to "save more money", consider a goal like "save $2,000".</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Next" onPress={next} disabled={!striveAnswers[0].answer}/>
                                </View>
                            </View>
                        </View>) : null
                    }

                    {activeIndex === 1 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[1].question}</Text>

                            <InputDate
                                placeholder="Select date..."
                                value={striveAnswers[1].answer}
                                onChange={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Example: Instead of trying to "become a millionaire", choose to "put $2,000 in a high interest savings account".</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Back" onPress={prev} link/>
                                    <AppButton title="Next" onPress={next} disabled={!striveAnswers[1].answer}/>
                                </View>
                            </View>
                        </View>) : null
                    }

                    {activeIndex === 2 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[2].question}</Text>

                            <InputTextarea
                                placeholder="Describe your end-result in 4-6 sentences..."
                                value={striveAnswers[2].answer}
                                onChangeText={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Example: Instead of choosing to "save more money", commit to "save $166 per month for one year".</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Back" onPress={prev} link/>
                                    <AppButton title="Next" onPress={next} disabled={!striveAnswers[2].answer}/>
                                </View>
                            </View>
                        </View>) : null
                    }

                    {activeIndex === 3 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[3].question}</Text>

                            <InputTextarea
                                placeholder="Describe how achieving this goal will improve your life..."
                                value={striveAnswers[3].answer}
                                onChangeText={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Example: If you’re saving money, ask yourself why. Deliberate goals like "save $2,000 for an engagement ring" are more powerful than general goals like "put $2,000 in savings".</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Back" onPress={prev} link/>
                                    <AppButton title="Next" onPress={next} disabled={!striveAnswers[3].answer}/>
                                </View>
                            </View>
                        </View>) : null
                    }

                    {activeIndex === 4 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[4].question}</Text>

                            <InputTextarea
                                placeholder="Type your answer here..."
                                value={striveAnswers[4].answer}
                                onChangeText={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Tip: These questions are designed to help you choose an Accountability Partner. Your ideal partner will celebrate your successes and provide encouragement if you fall behind.</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Back" onPress={prev} link/>
                                    <AppButton title="Next" onPress={next} disabled={!striveAnswers[4].answer}/>
                                </View>
                            </View>
                        </View>) : null
                    }

                    {activeIndex === 5 ? (
                        <View style={styles.card}>
                            <Text style={styles.question}>{striveAnswers[5].question}</Text>

                            <AppInput
                                placeholder="Type your answer here..."
                                value={striveAnswers[5].answer}
                                onChangeText={handleOnChangeValue}
                            />

                            <Text style={styles.example}>Tip: These questions are supposed to help you think about your lifestyle and anticipate changes. If you’re unwilling to make sacrifices, you may want to choose a new goal.</Text>

                            <View style={styles.actions}>
                                <AppButton
                                    title="Save and Exit"
                                    onPress={handleSaveAndExit}
                                    color={appStyles.colors.muted}
                                    link
                                />

                                <View style={styles.actionsMain}>
                                    <AppButton title="Back" onPress={prev} link/>
                                    <AppButton
                                        title="Finish"
                                        onPress={handleCreateStriveGoal}
                                        disabled={!striveAnswers[5].answer || isPending}
                                    />
                                </View>
                            </View>
                        </View>) : null
                    }
                </AppScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    GoalStriveSetupScreen: {
        flex: 1,
    },
    container: {
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    card: {
        padding: 15,
        marginTop: 30,
        backgroundColor: appStyles.colors.bg00,
        borderRadius: appStyles.general.borderRadius,
    },
    actions: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionsMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    question: {
        marginBottom: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    example: {
        marginTop: 15,
        textAlign: 'center',
    },
});

export default GoalStriveSetup;
