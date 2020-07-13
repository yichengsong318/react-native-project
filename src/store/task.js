import { observable, action, computed } from 'mobx';
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from 'react-native-flash-message';
import * as api from '../api';

export class TaskStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable tasks = [];
    @observable currentTaskId;
    @observable isFetchingCurrentTask = false;

    @computed
    get currentTask() {
        return this.tasks.find(task => task.id === this.currentTaskId);
    }

    @computed
    get incompleteTasks() {
        return this.tasks.filter(task => !task.completedAt);
    }

    @action
    setTasks(tasks) {
        this.tasks = tasks;
    }

    @action
    setCurrentTask(targetTask) {
        const task = this.tasks.find(task => task.id === targetTask.id);
        this.currentTaskId = task.id;
    }

    @action
    async fetchCurrentTask() {
        if (!this.currentTaskId || this.isFetchingCurrentTask) return;
        this.isFetchingCurrentTask = true;

        try {
            const res = await api.makeApiGetRequest(`tasks/${this.currentTaskId}`);
            if (!res.ok) return;

            const currentIndex = this.tasks.findIndex(task => task.id === this.currentTaskId);
            this.tasks[currentIndex] = res.body;

            this.isFetchingCurrentTask = false;

            await this.save();
        } catch (error) {
            this.isFetchingCurrentTask = false;
            // TODO: Error handling.
        }
    }

    @action
    async createTask(task) {
        try {
            const res = await api.makeApiPostRequest('tasks', task);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to create task';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Task has been created', type: 'success' });

            this.tasks = [res.body, ...this.tasks];
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to create task', type: 'danger' });
            return false;
        }
    }

    @action
    async removeTask(targetTask) {
        try {
            const res = await api.makeApiDelRequest(`tasks/${targetTask.id}`);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to delete task';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Task has been deleted', type: 'success' });

            this.tasks = this.tasks.filter(task => task.id !== targetTask.id);
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to delete task', type: 'danger' });
            return false;
        }
    }

    @action
    async updateTask(targetTask, patch) {
        try {
            const res = await api.makeApiPatchRequest(`tasks/${targetTask.id}`, {
                ...targetTask,
                ...patch,
            });
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to update task';
                showMessage({ message, type: 'danger' });
                return false;
            }

            this.tasks = this.tasks.map((task) => {
                if (task.id !== targetTask.id) return task;

                return { ...task, ...res.body };
            });

            this.save();

            return true;
        } catch (error) {
            console.log('error', error)
            showMessage({ message: 'NetworkError: Failed to update task', type: 'danger' });
            return false;
        }
    }

    @action
    async createComment(commentMessage) {
        const comment = { comment: { message: commentMessage } };

        try {
            const res = await api.makeApiPostRequest(`tasks/${this.currentTaskId}/comment`, comment);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to create comment';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Comment has been created', type: 'success' });

            await this.fetchCurrentTask();
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to create comment', type: 'danger' });
            return false;
        }
    }

    @action
    async removeComment(targetComment) {
        try {
            const res = await api.makeApiDelRequest(`tasks/comments/${targetComment.id}`);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to delete comment';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Comment has been deleted', type: 'success' });

            await this.fetchCurrentTask();
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to delete comment', type: 'danger' });
            return false;
        }
    }

    @action
    async removeAttachment(targetAttachment) {
        try {
            const res = await api.makeApiDelRequest(`tasks/attachments/${targetAttachment.id}`);
            if (!res.ok) {
                const message = res.body.error ? res.body.error.message : 'Error: Failed to delete attachment';
                showMessage({ message, type: 'danger' });
                return false;
            }

            showMessage({ message: 'Attachment has been deleted', type: 'success' });

            await this.fetchCurrentTask();
            this.save();

            return true;
        } catch (error) {
            showMessage({ message: 'NetworkError: Failed to delete attachment', type: 'danger' });
            return false;
        }
    }

    @action
    async save() {
        await AsyncStorage.setItem('@TASK:tasks', JSON.stringify(this.tasks))
            .catch(error => console.log('ERROR:', error));
    }

    @action
    async load() {
        try {
            const tasks = JSON.parse(await AsyncStorage.getItem('@TASK:tasks'));
            if (!tasks) return;

            this.tasks = tasks;
            this.currentIndex = 0;
        } catch (error) {
            console.log('ERROR:', error);
        }
    }
}
