// updateGame.js
export const updateGame = async (gameId, updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/games/${gameId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro do servidor:", errorData); // Detalha o erro do backend
        throw new Error('Erro ao atualizar o jogo');
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na atualização:", error);
      return null;
    }
  };
  