import { apiURL, tokenKey } from '../config.json';
import http from './httpService';

const authAPI = apiURL + 'auth/'

export async function login(email, password) {
  const { data: jwt } = await http.post(authAPI, {
    email: email,
    password: password
  })
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJWT,
  logout
}