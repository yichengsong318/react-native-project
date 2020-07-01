import { observable, action, computed } from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from 'react-native-flash-message';
// import nanoid from 'nanoid/non-secure'; // React Native does not have a built-in secure random generator. (We don't need one here anyway.)
import * as api from '../api';

export class GoalStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable goals = [];
    @observable currentGoalId;

    @action
    async refresh() {
        // TODO: Error handling.
        try {
            const resGoals = await api.makeApiGetRequest('goals');
            if (!resGoals.ok) return;

            const resGoalsJoined = await api.makeApiGetRequest('goals/joined');
            if (!resGoalsJoined.ok) return;

            this.goals = [...resGoals.body, ...resGoalsJoined.body.map(({ goal }) => goal)];

            await this.save();
        } catch (error) {

        }
    }

    getMyGoals() {
        return this.goals.filter(goal => goal.user.id === this.rootStore.userStore.user.id);
    }

    getJoinedGoals() {
        return this.goals.filter(goal => goal.user.id !== this.rootStore.userStore.user.id);
    }

    @action
    setCurrentGoal(targetGoal) {
        const goal = this.goals.find(goal => goal._id === targetGoal._id);
        this.currentGoalId = goal._id;
    }

    @computed
    get currentGoal() {
        return this.goals.find(goal => goal._id === this.currentGoalId);
    }

    @action
    async save() {
        await AsyncStorage.setItem('@GOAL:goals', JSON.stringify(this.goals))
            .catch(error => console.log('ERROR:', error));
    }

    @action
    async load() {
        try {
            const goals = JSON.parse(await AsyncStorage.getItem('@GOAL:goals'));
            if (!goals) return;

            this.goals = goals;
            this.currentIndex = 0;
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
}
