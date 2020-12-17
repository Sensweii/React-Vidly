import { apiURL } from '../config.json';
import http from './httpService';

const usersAPI = apiURL + 'users/'

export function register(user) {
    return http.post(usersAPI, {
        email: user.username,
        password: user.password,
        name: user.name
    })
}