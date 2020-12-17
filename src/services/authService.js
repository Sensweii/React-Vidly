import jwtDecode from 'jwt-decode';

import { apiURL } from '../config.json';
import http from './httpService';

const authAPI = apiURL + 'auth/'
const tokenKey = 'token';

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

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser
}