import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import * as dateFns from 'date-fns';
import { RRule } from 'rrule';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { SegmentedControls } from 'react-native-radio-buttons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { storeContext } from '../../store';
import AppModal from '../../components/AppModal';
import InputNumber from '../../components/InputNumber';
import InputDate from '../../components/InputDate';
import * as appStyles from '../../utils/styles';

const TaskRecurringModal = ({ navigation }) => {
    const { taskStore, userStore } = useContext(storeContext);
    const [frequency, setFrequency] = useState('Daily'); // Daily, Weekly, Monthly
    const [neverEnds, setNeverEnds] = useState(true);
    const [weeklyFrequency, setWeeklyFrequency] = useState(1);
    const [weeklyRepeatDay, setWeeklyRepeatDay] = useState(6);
    const [monthlyRepeatBy, setMonthlyRepeatBy] = useState('day_of_month');
    const [endsOnType, setEndsOnType] = useState('occurrences'); // occurrences, date
    const [endsOnCount, setEndsOnCount] = useState(null);
    const [endsOnUntil, setEndsOnUntil] = useState(null);

    const daysOfWeek = { 0: 'MO', 1: 'TU', 2: 'WE', 3: 'TH', 4: 'FR', 5: 'SA', 6: 'SU' };

    useEffect(() => {
        if (taskStore.currentTask && taskStore.currentTask.recurrence) {
            const rule = RRule.fromString(taskStore.currentTask.recurrence);

            if (rule.origOptions.bymonthday) {
                setFrequency('Monthly');
                setMonthlyRepeatBy('day_of_month');
            } else if (rule.origOptions.bysetpos && rule.origOptions.byweekday) {
                setFrequency('Monthly');
                setMonthlyRepeatBy('day_of_week');
            } else if (rule.origOptions.byweekday) {
                setFrequency('Weekly');
                setWeeklyRepeatDay(rule.origOptions.byweekday[0].weekday);

                if (rule.origOptions.interval) {
                    setWeeklyFrequency(rule.origOptions.interval)
                }
            }

            if (rule.origOptions.count) {
                setNeverEnds(false);
                setEndsOnType('occurrences');
                setEndsOnCount(rule.origOptions.count);
            }

            if (rule.origOptions.until) {
                setNeverEnds(false);
                setEndsOnType('date');
                setEndsOnUntil(rule.origOptions.until);
            }
        }
    }, [taskStore.currentTask.recurrence]);

    const handleCreateSchedule = async () => {
        let options = {};

        if (frequency === 'Monthly') {
            options = {
                freq: RRule.MONTHLY,
                interval: 1,
            };

            if (monthlyRepeatBy === 'day_of_month') {
                options.bymonthday = dateFns.getDate(new Date());
            } else if (monthlyRepeatBy === 'day_of_week') {
                options.byweekday = dateFns.getDay(new Date());
                options.bysetpos = Math.ceil(dateFns.getDate(new Date()) / 7);
            }
        } else if (frequency === 'Weekly') {
            options = {
                freq: RRule.WEEKLY,
                interval: weeklyFrequency,
                byweekday: RRule[daysOfWeek[weeklyRepeatDay]],
            };
        } else if (frequency === 'Daily') {
            options = {
                freq: RRule.DAILY,
                interval: 1,
            };
        }

        if (endsOnType === 'occurrences') {
            options.count = endsOnCount;
        } else if (endsOnType === 'date') {
            // options.until = dateFns.parseISO(this.schedule.until);
            options.until = endsOnUntil;
        }

        options.dtstart = dateFns.toDate(new Date());

        const recurrence = new RRule(options).toString();
        await taskStore.updateTask(taskStore.currentTask, { recurrence });
    };

    const viewPremiumModal = () => {
        navigation.navigate('Modal', { screen: 'PremiumModal' });
    };

    const NeverEndsToggle = () => {
        const Component = userStore.isPremium ? View : TouchableOpacity;

        return (
            <Component
                style={{ alignItems: 'flex-start' }}
                onPress={!userStore.isPremium ? viewPremiumModal : () => {}}
            >
                <Text style={[styles.label, !userStore.isPremium ? styles.disabled : null]}>Never ends</Text>

                <Switch
                    trackColor={{ false: '#767577', true: appStyles.colors.success }}
                    thumbColor="#f4f3f4"
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => setNeverEnds(prevState => !prevState)}
                    value={neverEnds}
                    disabled={!userStore.isPremium}
                    style={!userStore.isPremium ? styles.disabled : null}
                />
            </Component>
        );
    };

    const FrequencySelector = () => (
        <Menu style={{ marginBottom: 15 }}>
            <MenuTrigger>
                <View style={styles.picker}>
                    <Text numberOfLines={1}>{frequency}</Text>
                    <Icon name="caret-down" size={18}/>
                </View>
            </MenuTrigger>
            <MenuOptions>
                {['Daily', 'Weekly', 'Monthly'].map((freq) => (
                    <MenuOption key={freq} onSelect={() => setFrequency(freq)}>
                        <Text>{freq}</Text>
                    </MenuOption>
                ))}
            </MenuOptions>
        </Menu>
    );

    const WeeklyFrequencySelector = () => (
        <View style={{ marginBottom: 15 }}>
            {userStore.isPremium ? (
                <View>
                    <Text style={styles.label}>Repeat every</Text>

                    <Menu>
                        <MenuTrigger>
                            <View style={styles.picker}>
                                <Text numberOfLines={1}>{weeklyFrequency}</Text>
                                <Icon name="caret-down" size={18}/>
                            </View>
                        </MenuTrigger>
                        <MenuOptions>
                            {[1, 2, 3, 4, 5].map((freq) => (
                                <MenuOption key={freq} onSelect={() => setWeeklyFrequency(freq)}>
                                    <Text>{freq}</Text>
                                </MenuOption>
                            ))}
                        </MenuOptions>
                    </Menu>
                </View>
            ) : (
                <TouchableOpacity onPress={viewPremiumModal}>
                    <Text style={[styles.label, styles.disabled]}>Repeat every</Text>

                    <View
                        style={[styles.picker, { backgroundColor: appStyles.colors.disabledInputBg }]}
                    >
                        <Text numberOfLines={1}>{weeklyFrequency}</Text>
                        <Icon name="caret-down" size={18}/>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );

    const WeeklyDaySelector = () => {
        const daysOfWeekOptions = () => {
            const arrayOfWeeks = Object.entries(daysOfWeek).map(([key, value]) => {
                return { value: Number(key), label: value };
            });
            arrayOfWeeks.unshift(arrayOfWeeks.pop());
            return arrayOfWeeks;
        };

        return (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>Repeat on</Text>

                <SegmentedControls
                    options={daysOfWeekOptions()}
                    onSelection={(option) => setWeeklyRepeatDay(option.value)}
                    selectedOption={weeklyRepeatDay}
                    extractText={(option) => option.label}
                    testOptionEqual={(selOption, curOption) => curOption.value === weeklyRepeatDay}
                />
            </View>
        )
    };

    const WeeklyFrequency = () => (
        <View>
            <WeeklyFrequencySelector/>
            <WeeklyDaySelector/>
        </View>
    );

    const MonthlyRepeatSelector = () => {
        const options = [
            { label: 'Day of the month', value: 'day_of_month' },
            { label: 'Day of the week', value: 'day_of_week' },
        ]

        return (
            <View style={{ marginBottom: 15 }}>
                <Text style={styles.label}>Repeat by</Text>

                <SegmentedControls
                    options={options}
                    onSelection={(option) => setMonthlyRepeatBy(option.value)}
                    selectedOption={monthlyRepeatBy}
                    extractText={(option) => option.label}
                    testOptionEqual={(selOption, curOption) => curOption.value === monthlyRepeatBy}
                />
            </View>
        )
    }

    const MonthlyFrequency = () => (
        <View>
            <MonthlyRepeatSelector/>
        </View>
    );

    const EndsOnTypeSelector = () => {
        const options = [
            { label: 'Occurrences', value: 'occurrences' },
            { label: 'Date', value: 'date' },
        ]

        return (
            <SegmentedControls
                options={options}
                onSelection={(option) => setEndsOnType(option.value)}
                selectedOption={endsOnType}
                extractText={(option) => option.label}
                testOptionEqual={(selOption, curOption) => curOption.value === endsOnType}
            />
        )
    }

    const EndsOnSelector = () => (
        <View>
            <View style={{ marginVertical: 15 }}>
                <EndsOnTypeSelector/>
            </View>

            {endsOnType === 'occurrences' ? (
                <View>
                    <Text style={styles.label}>Max occurrences</Text>

                    <InputNumber
                        onChange={setEndsOnCount}
                        value={endsOnCount ? `${endsOnCount}` : '0'}
                        maxLength={2}
                    />
                </View>
            ) : endsOnType === 'date' ? (
                <View>
                    <Text style={styles.label}>Ends on</Text>

                    <InputDate
                        value={endsOnUntil}
                        onChange={setEndsOnUntil}
                    />
                </View>
            ) : null}
        </View>
    );

    return (
        <AppModal
            style={styles.TaskRecurringModal}
            title="Repeat task"
            confirmText="Confirm"
            onConfirm={handleCreateSchedule}
        >
            <FrequencySelector/>

            {frequency === 'Weekly' ? (
                <WeeklyFrequency/>
            ) : frequency === 'Monthly' ? (
                <MonthlyFrequency/>
            ) : null}

            <NeverEndsToggle/>

            {!neverEnds ? (
                <EndsOnSelector/>
            ) : null}
        </AppModal>
    );
};

const styles = StyleSheet.create({
    TaskRecurringModal: {
        flex: 1,
    },
    picker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appStyles.colors.divider,
        borderRadius: appStyles.general.borderRadius,
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    disabled: {
        opacity: 0.6,
    },
});

export default TaskRecurringModal;
