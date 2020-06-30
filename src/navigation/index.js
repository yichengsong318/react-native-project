import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../screens/Loading';
import Login from '../screens/Login';
import Goals from "../screens/Goals";
import Accountability from "../screens/Accountability";
import Settings from "../screens/Settings";
import * as styles from '../utils/styles';

const createOptions = (initialRouteName, opts = {}) => {
    return { initialRouteName, headerMode: 'none', ...opts };
};

const createTabOptions = (Screen, title, iconName) => {
    const tabBarIcon = ({ tintColor }) => (<Icon
        name={iconName}
        color={tintColor}
        size={20}
        style={{ marginBottom: -5 }}
    />);

    return {
        screen: createAppContainer(Screen),
        navigationOptions: ({ navigation }) => {
            // TODO: Fix this mess. Let's be honest this is never going to happen tho.
            let tabBarVisible = true;
            if (navigation.state.routes) {
                const route = navigation.state.routes[navigation.state.index];
                tabBarVisible = /^Goals|Accountability|SettingsTab$/.test(route.routeName);
            }

            return { title, tabBarIcon, tabBarVisible };
        },
    };
};

// ---------------------------------------------------------
// Goal Navigator

const GoalNavigator = createStackNavigator({
    Goals,
}, createOptions('Goals'));

// ---------------------------------------------------------
// Accountability Navigator

const AccountabilityNavigator = createStackNavigator({
    Accountability,
}, createOptions('Accountability'));

// ---------------------------------------------------------
// Home Navigator

const HomeNavigator = createBottomTabNavigator({
    GoalTab: createTabOptions(GoalNavigator, 'Goals', 'rocket'),
    AccountabilityTab: createTabOptions(AccountabilityNavigator, 'Accountability', 'users'),
    SettingsTab: createTabOptions(Settings, 'Settings', 'cog'),
}, createOptions('GoalTab', {
    tabBarOptions: {
        activeTintColor: styles.colors.primary,
        labelStyle: { fontSize: 13 },
    },
}));

// ---------------------------------------------------------
// Auth Navigator

const AuthNavigator = createStackNavigator({
    Login,
}, createOptions('Login'));

// ---------------------------------------------------------
// App Navigator

const AppNavigator = createStackNavigator({
    Load: createAppContainer(Loading),
    Auth: createAppContainer(AuthNavigator),
    Home: createAppContainer(HomeNavigator),
}, createOptions('Load'));

export default AppNavigator;
