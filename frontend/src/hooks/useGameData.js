// src/hooks/useGameData.js
export const getGames = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/games/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao carregar jogos");
    }
    return await response.json(); // Retorna os dados JSON
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return []; // Retorna uma lista vazia em caso de erro
  }
};
