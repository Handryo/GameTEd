import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeusJogos.css';
import Card from '../../components/Card/Card.jsx';
import { getGames } from '../../hooks/useGameData.js';
import CreateModal from '../../components/Modal/CreateModal.jsx';

function MeusJogos() {
  const [gamesList, setGamesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGames();
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
      console.error("gameId não definido!");
    }
  };

  return (
    <div className="container">
      <h1>Meus Jogos</h1>

      <div className="games-container">
        <div className="card-grid">
          {gamesList.map((game, index) => (
            <Card
              key={`game-${game.id || index}`} // Chave única mesmo sem game.id
              title={game.title || "Título Indisponível"}
              image={game.image || game.photo_files?.[0]?.image || '/path/to/default-image.jpg'}
              genre={game.genre || "Gênero Indisponível"}
              onClick={() => handleCardClick(game.id || index)} // Fallback para o índice se o ID estiver ausente
            />
          ))}
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
