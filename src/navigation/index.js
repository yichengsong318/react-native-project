import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { storeContext } from '../store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../screens/Loading';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Goals from "../screens/goals/Goals";
import GoalView from "../screens/goals/GoalView";
import GoalInvites from "../screens/goals/GoalInvites";
import GoalTypeSelection from "../screens/goals/GoalTypeSelection";
import GoalPlan from "../screens/goals/GoalPlan";
import TaskEdit from "../screens/goals/TaskEdit";
import Invites from "../screens/Invites";
import Invitation from "../screens/Invitation";
import RenameGoalModal from "../screens/modals/RenameGoalModal";
import Settings from "../screens/Settings";
import * as appStyles from '../utils/styles';

const createTabOptions = ({ route }, iconName) => {
    const tabBarIcon = ({ color }) => (
        <Icon
            name={iconName}
            color={color}
            size={20}
            style={{ marginBottom: -5 }}
        />
    );

    const routeName = route.state ? route.state.routes[route.state.index].name : '';
    const tabBarVisible = routeName && !/^Goals|^Invites|^Settings$/.test(routeName) ? false : true;

    return { tabBarIcon, tabBarVisible };
};


// ---------------------------------------------------------
// Auth

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Signup" component={Signup}/>
        <AuthStack.Screen name="Login" component={Login}/>
    </AuthStack.Navigator>
);


// ---------------------------------------------------------
// Goal

const GoalStack = createStackNavigator();
const GoalStackScreen = () => (
    <GoalStack.Navigator screenOptions={{ headerShown: false }}>
        <GoalStack.Screen name="Goals" component={Goals}/>
        <GoalStack.Screen name="GoalView" component={GoalView}/>
        <GoalStack.Screen name="GoalInvites" component={GoalInvites}/>
        <GoalStack.Screen name="GoalPlan" component={GoalPlan}/>
        <GoalStack.Screen name="GoalTypeSelection" component={GoalTypeSelection}/>
        <GoalStack.Screen name="TaskEdit" component={TaskEdit}/>
    </GoalStack.Navigator>
);


// ---------------------------------------------------------
// Invite

const InviteStack = createStackNavigator();
const InviteStackScreen = () => (
    <InviteStack.Navigator screenOptions={{ headerShown: false }}>
        <InviteStack.Screen name="Invites" component={Invites}/>
        <InviteStack.Screen name="Invitation" component={Invitation}/>
    </InviteStack.Navigator>
);


// ---------------------------------------------------------
// Tab

const Tab = createBottomTabNavigator();
const TabScreen = () => (
    <Tab.Navigator
        tabBarOptions={{
            activeTintColor: appStyles.colors.primary,
            labelStyle: { fontSize: 13 },
        }}
    >
        <Tab.Screen name="Goals" component={GoalStackScreen} options={(props) => createTabOptions(props, 'rocket')}/>
        <Tab.Screen name="Invites" component={InviteStackScreen} options={(props) => createTabOptions(props, 'envelope')}/>
        <Tab.Screen name="Settings" component={Settings} options={(props) => createTabOptions(props, 'cog')}/>
    </Tab.Navigator>
);


// ---------------------------------------------------------
// Modal

const modalOptions = () => ({
    cardStyle: { backgroundColor: 'transparent' },
    cardOverlayEnabled: true,
});

const Modal = createStackNavigator();
const ModalScreen = () => (
    <Modal.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="RenameGoalModal" component={RenameGoalModal} options={modalOptions}/>
    </Modal.Navigator>
);


// ---------------------------------------------------------
// Root Stack

const RootStack = createStackNavigator();
const RootStackScreen = observer(({ store }) => (
    <RootStack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: false }}
        mode="modal"
    >
        {store.userStore.user ? (
            <RootStack.Screen name="TabScreen" component={TabScreen}/>
        ) : (
            <RootStack.Screen name="AuthStackScreen" component={AuthStackScreen}/>
        )}

        <RootStack.Screen name="Modal" component={ModalScreen} options={{
            animationEnabled: true,
            cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                    opacity: progress.interpolate({
                        inputRange: [0, 0.5, 0.9, 1],
                        outputRange: [0, 0.25, 0.7, 1],
                    }),
                },
                overlayStyle: {
                    opacity: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.5],
                        extrapolate: 'clamp',
                    }),
                },
            }),
        }}/>
    </RootStack.Navigator>
));

export default () => {
    const store = React.useContext(storeContext);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            if (!store.initialized) await store.init();
            setIsLoading(false);
        })();
    });

    if (isLoading) {
        return <Loading/>
    }

    return (
        <NavigationContainer>
            <RootStackScreen store={store}/>
        </NavigationContainer>
    );
};
