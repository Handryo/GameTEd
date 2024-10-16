// src/gameService.js

// Variável para armazenar jogos localmente
let games = [];

// Função para criar um novo jogo
export const addGame = async (gameData) => {
    try {
        // Simula a adição de um jogo
        games.push(gameData);
        return Promise.resolve(gameData);
    } catch (error) {
        console.error('Erro ao criar jogo:', error);
        throw error;
    }
};

// Função para obter a lista de jogos
export const getGames = async () => {
    try {
        // Retorna os jogos armazenados localmente
        return Promise.resolve(games);
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        throw error;
    }
};
