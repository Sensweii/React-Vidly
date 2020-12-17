import { apiURL } from '../config.json';
import http from './httpService';

const authAPI = apiURL + 'auth/'

export function login(email, password) {
    return http.post(authAPI, {
        email: email,
        password: password
    })
}