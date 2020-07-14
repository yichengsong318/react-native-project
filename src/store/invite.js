import { observable, action, computed } from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from 'react-native-flash-message';
import * as api from '../api';

export class InviteStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable invites = [];
    @observable currentInviteId;

    @computed
    get currentInvite() {
        return this.invites.find(invite => invite.id === this.currentInviteId);
    }

    @computed
    get incomingInvites() {
        return this.invites.filter(invite => invite.email === this.rootStore.userStore.user.email);
    }

    @computed
    get currentGoalInvites() {
        return this.invites.filter(invite => invite.goal.id === this.rootStore.goalStore.currentGoalId);
    }

    @action
    async refresh() {
        try {
            const resInvites = await api.makeApiGetRequest('invites');
            if (!resInvites.ok) return;

            this.invites = resInvites.body;

            if (this.rootStore.goalStore.currentGoalId) {
                const resGoalInvites = await api.makeApiGetRequest(`invites/goals/${this.rootStore.goalStore.currentGoalId}`);
                if (!resGoalInvites.ok) return;

                this.invites = [...this.invites, ...resGoalInvites.body];
            }

            await this.save();
        } catch (error) {
            // TODO: Error handling.
        }
    }

    @action
    setCurrentInvite(targetInvite) {
        const invite = this.invites.find(invite => invite.id === targetInvite.id);
        this.currentInviteId = invite.id;
    }

    @action
    async save() {
        await AsyncStorage.setItem('@INVITE:invites', JSON.stringify(this.invites))
            .catch(error => console.log('ERROR:', error));
    }

    @action
    async load() {
        try {
            const invites = JSON.parse(await AsyncStorage.getItem('@INVITE:invites'));
            if (!invites) return;

            this.invites = invites;
            this.currentIndex = 0;
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
}
