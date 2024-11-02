import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeusJogos.css';
import Card from '../../components/Card/Card.jsx';
import { getGames } from '../../hooks/useGameData.js';
import { deleteGame } from '../../hooks/deleteGame.js';
import CreateModal from '../../components/Modal/CreateModal.jsx';

const BASE_URL = 'https://seuservidor.com/images/';
const FALLBACK_IMAGE = 'https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true';

function MeusJogos() {
  const [gamesList, setGamesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const handleCardClick = (gameId) => {
    if (gameId) {
      navigate(`/game/${gameId}`);
    } else {
      console.error("ID do jogo não definido!");
    }
  };

  const handleDeleteGame = async (gameId) => {
    const success = await deleteGame(gameId);
    if (success) {
      setGamesList(prevGames => prevGames.filter(game => game.id !== gameId));
      console.log("Jogo deletado com sucesso");
    } else {
      console.error("Erro ao deletar jogo");
    }
  };

  return (
    <div className="container">
      <h1>Submetidos</h1>

      <div className="games-container">
        <div className="card-grid">
          {gamesList.map((game) => {
            const imageUrl = game.photo_files?.[0]?.image 
              ? game.photo_files[0].image.startsWith('http')
                ? game.photo_files[0].image
                : `${BASE_URL}${game.photo_files[0].image}`
              : FALLBACK_IMAGE;

            return (
              <Card
                key={game.id}
                id={game.id}
                title={game.title || "Título Indisponível"}
                image={imageUrl}
                fallbackImage={FALLBACK_IMAGE}
                genre={game.game_genre || "Gênero Indisponível"}
                onClick={() => handleCardClick(game.id)}
                onDelete={() => handleDeleteGame(game.id)}
                showDeleteButton={true} // Garante que o botão "Excluir" aparece apenas nos cards
              />
            );
          })}
        </div>
      </div>
      
      <div className="button-container">
        <button className="submit-game-button" onClick={handleOpenModal}>
          Adicionar Jogo
        </button>
      </div>

      {isModalOpen && (
        <CreateModal 
          closeModal={handleOpenModal} 
          onGameSubmitted={handleAddGame}
        />
      )}
    </div>
  );
}

export default MeusJogos;


