// src/hooks/deleteGame.js

export async function deleteGame(gameId) {
    const API_URL = `http://127.0.0.1:8000/api/games/${gameId}/`; // Inclui barra final para evitar erros de roteamento
  
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Header para JSON
          // Adicione o token de autenticação, se necessário
          // 'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        // Verifica status específico e lança erro detalhado
        if (response.status === 404) {
          throw new Error("Jogo não encontrado no backend");
        } else if (response.status === 500) {
          throw new Error("Erro interno do servidor ao deletar jogo");
        } else {
          throw new Error("Erro ao deletar jogo no backend");
        }
      }
  
      console.log("Jogo deletado com sucesso");
      return true; // Sucesso
    } catch (error) {
      console.error("Erro ao realizar a requisição de exclusão:", error.message);
      return false; // Falha
    }
}
