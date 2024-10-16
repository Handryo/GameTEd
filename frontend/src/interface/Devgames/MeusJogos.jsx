import React, { useState, useEffect } from 'react';
import './MeusJogos.css';
import { Card } from '../../components/Card/Card.jsx';
import { getGames } from '../../services/gameService';
import CreateModal from '../../components/Modal/CreateModal.jsx'; // Importando sem chaves

function MeusJogos() {
  const [gamesList, setGamesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!gamesList.some(game => game.id === newGame.id)) {
      setGamesList(prevGames => [...prevGames, newGame]);
    }
  };

  return (
    <div className="container">
      <h1>Meus Jogos</h1>
      
      {/* Container para os jogos */}
      <div className="games-container">
        <div className="card-grid">
          {gamesList.map(game => (
            <Card
              key={game.id}
              title={game.title}
              image={game.image}
              genre={game.genre}
            />
          ))}
        </div>
      </div>
      
      {/* Container para o botão de adicionar jogo */}
      <div className="button-container">
        <button className="submit-game-button" onClick={handleOpenModal}>
          Adicionar Jogo
        </button>
      </div>

      {isModalOpen && (
        <CreateModal 
          closeModal={handleOpenModal} 
          onGameSubmitted={handleAddGame} // Ajustando o nome da prop para corresponder ao que está no modal
        />
      )}
    </div>
  );
}

export default MeusJogos;
