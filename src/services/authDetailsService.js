// This module resolves the circular import between httpService and authService.
// It takes out several non-http methods from authService and moves`tokenKey`
// to config. Convention will be to import object from authDetailsService as
// `authDetails` and object from authService as `auth`.

import jwtDecode from 'jwt-decode';

import { tokenKey } from '../config.json';

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export default {
  getCurrentUser,
  getJWT
}