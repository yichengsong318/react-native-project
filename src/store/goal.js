import { observable, action, computed } from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from 'react-native-flash-message';
import * as api from '../api';

export class GoalStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable goals = [];
    @observable currentGoalId;
    @observable isFetchingCurrentGoal = false;

    @computed
    get currentGoal() {
        return this.goals.find(goal => goal.id === this.currentGoalId);
    }

    @computed
    get getMyGoals() {
        return this.goals.filter(goal => goal.user.id === this.rootStore.userStore.user.id);
    }

    @computed
    get getJoinedGoals() {
        return this.goals.filter(goal => goal.user.id !== this.rootStore.userStore.user.id);
    }

    @action
    async refresh() {
        try {
            const resGoals = await api.makeApiGetRequest('goals');
            if (!resGoals.ok) return;

            const resGoalsJoined = await api.makeApiGetRequest('goals/joined');
            if (!resGoalsJoined.ok) return;

            this.goals = [...resGoals.body, ...resGoalsJoined.body];

            await this.save();
        } catch (error) {
            // TODO: Error handling.
        }
    }

    @action
    setCurrentGoal(targetGoal) {
        const goal = this.goals.find(goal => goal.id === targetGoal.id);
        this.currentGoalId = goal.id;
    }

    @action
    async fetchCurrentGoal() {
        if (!this.currentGoalId || this.isFetchingCurrentGoal) return;
        this.isFetchingCurrentGoal = true;

        try {
            const res = await api.makeApiGetRequest(`goals/${this.currentGoalId}`);
            if (!res.ok) return;

            const currentIndex = this.goals.findIndex(goal => goal.id === this.currentGoalId);
            this.goals[currentIndex] = res.body;
            this.isFetchingCurrentGoal = false;

            await this.save();
        } catch (error) {
            this.isFetchingCurrentGoal = false;
            // TODO: Error handling.
        }
    }

    @action
    async removeGoal(targetGoal) {
        try {
            const res = await api.makeApiDelRequest(`goals/${targetGoal.id}`);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to delete goal';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Goal has been deleted', type: 'success' });

            this.goals = this.goals.filter(goal => goal.id !== targetGoal.id);
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to delete goal', type: 'danger' });
            return false;
        }
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
