// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const createGame = (gameData) => {
    return api.post('/games', gameData);
};

export const fetchGames = () => {
    return api.get('/games');
};

// Adicione outros métodos conforme necessário
