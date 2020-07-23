import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { storeContext } from '../../store';
import AppModal from '../../components/AppModal';
import * as appStyles from '../../utils/styles';

const GoalThemeModal = ({ navigation }) => {
    const { goalStore, userStore } = useContext(storeContext);
    const goal = goalStore.currentGoal;

    const handleChangeTheme = async (theme) => {
        await goalStore.updateGoal(goal, { theme })

        navigation.pop();
    };

    const handleViewPremium = () => {
        navigation.navigate('Modal', { screen: 'PremiumModal' });
    };

    return (
        <AppModal
            style={styles.GoalThemeModal}
            title="Change Goal Theme"
            cancelText="Close"
            hideConfirmBtn={true}
        >
            <View style={[styles.themeList, !userStore.isPremium ? styles.disabled : null]}>
                {Object.entries(appStyles.goalThemes).map(([theme, colors]) => (
                    <TouchableOpacity
                        key={theme}
                        style={styles.themeItem}
                        onPress={userStore.isPremium ? () => handleChangeTheme(theme) : handleViewPremium}
                    >
                        <LinearGradient colors={colors} style={styles.themeGradient}/>
                        <Text style={styles.themeText}>
                            {theme === 'strive2goal' ? 'Strive2Goal' : theme}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    GoalThemeModal: {
        flex: 1,
    },
    themeList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    themeItem: {
        width: `${100 / 3}%`,
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    themeGradient: {
        width: '100%',
        height: 60,
        borderRadius: appStyles.general.borderRadius,
    },
    themeText: {
        marginTop: 5,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    disabled: {
        opacity: 0.4,
    },
});

export default GoalThemeModal;
