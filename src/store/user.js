import AsyncStorage from "@react-native-community/async-storage";
import { observable, action } from 'mobx';
import { showMessage } from 'react-native-flash-message';
import * as api from '../api';

export class UserStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable user = null;
    @observable token = null;

    @action
    async login(email, password) {
        showMessage({ message: 'Logging in...', type: 'info' });

        try {
            const res = await api.makeApiPostRequest('login', { email, password });
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Invalid credentials';
                showMessage({ message, type: 'danger' });
                return false;
            }

            this.user = res.body.user;
            this.token = res.body.token;

            await this.rootStore.refresh();
            await this.save();

            showMessage({ message: 'You are now logged in', type: 'success' });
            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Login request failed', type: 'danger' });
            return false;
        }
    }

    @action
    async signup(firstName, lastName, email, password) {
        showMessage({ message: 'Signing up...', type: 'info' });

        try {
            const res = await api.makeApiPostRequest('users', { firstName, lastName, email, password });
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Signup form incomplete';
                showMessage({ message, type: 'danger' });
                return false;
            }

            await this.login(email, password);

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Signup request failed', type: 'danger' });
            return false;
        }
    }

    @action
    async logout() {
        this.user = null;
        this.token = null;
        await this.save();
    }

    @action
    async changePassword(payload) {
        showMessage({ message: 'Updating password...', type: 'info' });

        try {
            const res = await api.makeApiPostRequest(`users/${this.user.id}/changePassword`, payload);
            if (!res.ok) {
                showMessage({ message: 'Error: Invalid password', type: 'danger' });
                return false;
            }

            showMessage({ message: 'Your password has been changed', type: 'success' });
            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to update password', type: 'danger' });
            return false;
        }
    }

    @action
    async save() {
        const data = { user: this.user, token: this.token };
        await AsyncStorage.setItem('@USER:store', JSON.stringify(data))
            .catch(error => console.log('ERROR:', error));
    }

    @action
    async load() {
        try {
            const data = JSON.parse(await AsyncStorage.getItem('@USER:store'));
            if (!data) return;

            this.user = data.user;
            this.token = data.token;
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
}
