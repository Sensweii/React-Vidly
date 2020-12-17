import { apiURL } from '../config.json';
import http from './httpService';

const genresAPI = apiURL + 'genres/'

export function getGenres() {
    return http.get(genresAPI);
}
