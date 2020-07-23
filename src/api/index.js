import _ from 'lodash';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { store } from '../store';
import { API_URL } from 'react-native-dotenv';

const getApiUrl = (url) => `${API_URL}/api/${url}`;
const getApiOptions = () => {
    const token = store.userStore.token;
    return token ? { headers: { token } } : {};
}

export async function makeRequest(url, options) {
    try {
        const res = await fetch(url, options);

        const contentType = res.headers.get('Content-Type');
        const isJson = contentType && contentType.includes('application/json');
        return {
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
            body: isJson ? await res.json() : await res.text(),
        };
    } catch (error) {
        console.log('ERROR: api.makeRequest:', error);
        showMessage({ message: 'Internet is unreachable, continue in offline mode.', type: 'none' });
        throw error;
    }
}

export async function makeApiGetRequest(url, options = {}) {
    return makeRequest(getApiUrl(url), _.merge(getApiOptions(), options));
}

export async function makeApiPostRequest(url, body = {}, options = {}) {
    const postOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };

    return makeRequest(getApiUrl(url), _.merge(getApiOptions(), postOptions, options));
}

export async function makeApiPatchRequest(url, body = {}, options = {}) {
    const patchOptions = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    };

    return makeRequest(getApiUrl(url), _.merge(getApiOptions(), patchOptions, options));
}

export async function makeApiDelRequest(url, options = {}) {
    return makeRequest(getApiUrl(url), _.merge(getApiOptions(), { method: 'DELETE' }, options));
}

export async function makeApiPhotoPostRequest(url, file) {
    const formData = new FormData();
    formData.append('file', {
        name: file.fileName,
        type: file.type || 'image/jpeg', // TODO: figure out why this isn't always set.
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
    });

    return makeRequest(getApiUrl(url), _.merge(getApiOptions(), { method: 'POST', body: formData }));
}
