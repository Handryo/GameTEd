import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeusJogos.css';
import Card from '../../components/Card/Card.jsx';
import { getGames } from '../../hooks/useGameData.js';
import { deleteGame } from '../../hooks/deleteGame.js';
import EditModal from '../../components/EditModal/EditModal.jsx';
import CreateModal from '../../components/Modal/CreateModal.jsx';

const FALLBACK_IMAGE = 'https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true';

function MeusJogos() {
  const [gamesList, setGamesList] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let games = await getGames();
        games = games.map((game, index) => ({
          ...game,
          id: game.id || `${index + 1}`
        }));
        setGamesList(games);
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    };
    fetchGames();
  }, []);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleAddGame = (newGame) => {
    if (!newGame.id) {
      console.error("Novo jogo sem ID:", newGame);
      return;
    }
    if (!gamesList.some(game => game.id === newGame.id)) {
      setGamesList(prevGames => [...prevGames, newGame]);
    }
  };

  const handleEditGame = (game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const handleUpdateGame = (updatedGame) => {
    setGamesList(prevGames => 
      prevGames.map(game => game.id === updatedGame.id ? updatedGame : game)
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteGame = async (gameId) => {
    const success = await deleteGame(gameId);
    if (success) {
      setGamesList(prevGames => prevGames.filter(game => game.id !== gameId));
      console.log("Jogo deletado com sucesso");
      if (selectedGame && selectedGame.id === gameId) {
        setIsEditModalOpen(false);
        setSelectedGame(null);
      }
    } else {
      console.error("Erro ao deletar jogo");
    }
  };

  const handleCardClick = (gameId) => {
    if (gameId) {
      navigate(`/game/${gameId}`);
    } else {
      console.error("ID do jogo não definido!");
    }
  };

  return (
    <div className="container">
      <h1>Submetidos</h1>

      <div className="games-container">
        <div className="card-grid">
          {gamesList.map((game) => {
            const photoUrl = game.photo_url || FALLBACK_IMAGE;

            return (
              <Card
                key={game.id}
                id={game.id}
                title={game.title || "Título Indisponível"}
                image={photoUrl}
                genre={game.game_genre || "Gênero Indisponível"}
                onClick={() => handleCardClick(game.id)}
                onEdit={() => handleEditGame(game)}
                showEditButton={true} // Apenas nesta página
              />
            );
          })}
        </div>
      </div>
      
      <div className="button-container">
        <button className="submit-game-button" onClick={handleOpenCreateModal}>
          Adicionar Jogo
        </button>
      </div>

      {isCreateModalOpen && (
        <CreateModal 
          closeModal={handleOpenCreateModal} 
          onGameSubmitted={handleAddGame}
        />
      )}

      {isEditModalOpen && selectedGame && (
        <EditModal 
          gameData={selectedGame} 
          onClose={() => setIsEditModalOpen(false)} 
          onUpdate={handleUpdateGame} 
          onDelete={handleDeleteGame} 
        />
      )}
    </div>
  );
}

export default MeusJogos;
