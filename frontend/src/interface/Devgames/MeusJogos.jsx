import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MeusJogos.css';
import Card from '../../components/Card/Card.jsx';
import { getGames } from '../../hooks/useGameData.js';
import CreateModal from '../../components/Modal/CreateModal.jsx';

const BASE_URL = 'https://seuservidor.com/images/'; // Substitua pelo URL base, se necessário
const FALLBACK_IMAGE = 'https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true';

function MeusJogos() {
  const [gamesList, setGamesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let games = await getGames();
        console.log("Lista de jogos carregada:", games);

        // Adiciona um ID único para cada jogo que não possui um ID
        games = games.map((game, index) => ({
          ...game,
          id: game.id || `${index + 1}` // Atribui um ID temporário caso esteja ausente
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
    console.log("ID do jogo clicado:", gameId);
    if (gameId) {
      navigate(`/game/${gameId}`); // Usa o caminho completo
    } else {
      console.error("ID do jogo não definido!");
    }
  };

  return (
    <div className="container">
      <h1>Meus Jogos</h1>

      <div className="games-container">
        <div className="card-grid">
          {gamesList.map((game) => {
            // Determina o caminho da imagem
            const imageUrl = game.photo_files?.[0]?.image 
              ? game.photo_files[0].image.startsWith('http')
                ? game.photo_files[0].image
                : `${BASE_URL}${game.photo_files[0].image}`
              : FALLBACK_IMAGE;

            //console.log(`URL da imagem para o jogo ${game.title}:`, imageUrl); // Log para verificar a URL da imagem

            return (
              <Card
                key={game.id} // Usa o ID atualizado
                id={game.id} // Passa o ID diretamente como prop
                title={game.title || "Título Indisponível"}
                image={imageUrl} // Define a URL da imagem
                fallbackImage={FALLBACK_IMAGE} // Define a imagem de fallback
                genre={game.game_genre || "Gênero Indisponível"} // Atualiza para o nome correto do campo
                onClick={() => handleCardClick(game.id)} // Usa o ID direto no clique
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
