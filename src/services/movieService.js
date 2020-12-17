import { apiURL } from '../config.json';
import http from './httpService';

const moviesAPI = apiURL + 'movies/'

function movieUrl(movieId) {
    return `${moviesAPI}/${movieId}`;
}

export function getMovies() {
    return http.get(moviesAPI);
}

export function getMovie(movieId) {
    return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
    if (movie._id) {
        const requestBody = { ...movie };
        delete requestBody._id;
        return http.put(movieUrl(movie._id), requestBody);
    }
    return http.post(moviesAPI, movie);
}

export function deleteMovie(movieId) {
    return http.delete(movieUrl(movieId));
}
