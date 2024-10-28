import React, { useState, useEffect } from 'react';
import './MeusJogos.css';
import { Card } from '../../components/Card/Card.jsx';
import { getGames } from '../../hooks/useGameData.js';
import CreateModal from '../../components/Modal/CreateModal.jsx';

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

  // Função para abrir/fechar o modal
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Função para adicionar um novo jogo na lista, evitando duplicações
  const handleAddGame = (newGame) => {
    if (!gamesList.some(game => game.id === newGame.id)) {
      setGamesList(prevGames => [...prevGames, newGame]);
    }
  };

  return (
    <div className="container">
      <h1>Meus Jogos</h1>
      
      {/* Exibindo os jogos em uma grade de cards */}
      <div className="games-container">
        <div className="card-grid">
        {gamesList.map((game, index) => (
            <Card
              key={index} // Temporário, substitua por game.id assim que possível
              title={game.title}
              image={game.image}
              genre={game.genre}
            />
          ))}
        </div>
      </div>
      
      {/* Botão para abrir o modal de adicionar jogo */}
      <div className="button-container">
        <button className="submit-game-button" onClick={handleOpenModal}>
          Adicionar Jogo
        </button>
      </div>

      {/* Modal de criação de novo jogo */}
      {isModalOpen && (
        <CreateModal 
          closeModal={handleOpenModal} 
          onGameSubmitted={handleAddGame} // Prop para passar o novo jogo para a lista
        />
      )}
    </div>
  );
}

export default MeusJogos;
