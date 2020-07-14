import { createContext } from 'react';
import { observable, action } from 'mobx';
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from 'react-native-flash-message';

import { UserStore } from "./user";
import { GoalStore } from "./goal";
import { TaskStore } from "./task";
import { InviteStore } from "./invite";

class Store {
    @observable initialized = false;
    @observable user = false;

    constructor() {
        this.userStore = new UserStore(this);
        this.goalStore = new GoalStore(this);
        this.taskStore = new TaskStore(this);
        this.inviteStore = new InviteStore(this);
    }

    @action
    async init() {
        await this.userStore.load();
        await this.goalStore.load();
        await this.taskStore.load();
        await this.inviteStore.load();

        this.initialized = true;
        if (this.userStore.user) {
            await this.refresh();
        }
    }

    @action
    async refresh() {
        const state = await NetInfo.fetch();
        if (state.isInternetReachable) {
            await this.goalStore.refresh();
            await this.goalStore.fetchCurrentGoal();
            await this.inviteStore.refresh();
        } else {
            showMessage({ message: 'Internet is unreachable, continue in offline mode.', type: 'none' });
        }
    }
}

export const store = new Store();
export const storeContext = createContext(store);
