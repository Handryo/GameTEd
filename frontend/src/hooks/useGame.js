export const getGameById = async (gameId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/games/${gameId}/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar informações do jogo");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  