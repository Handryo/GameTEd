import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar o gameId do jogo
import { getGameById } from '../../hooks/useGame.js'; // Função para obter o jogo pelo id
import './GamePage.css';

function GamePage() {
  const { gameId } = useParams(); // Captura o gameId da URL
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        console.log("Fetching game with ID:", gameId); // Log para depuração
        const game = await getGameById(Number(gameId)); // Converte gameId para número, se necessário
        if (game) {
          console.log("Game data received:", game); // Log para confirmar dados do jogo
          setGameInfo(game); // Define o jogo específico
        } else {
          console.error("Game not found for ID:", gameId);
        }
      } catch (error) {
        console.error("Erro ao carregar informações do jogo:", error);
      }
    };
    fetchGameInfo();
  }, [gameId]);

  if (!gameInfo) return <p>Carregando...</p>; // Mostra uma mensagem enquanto carrega

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          {gameInfo.title}
        </h1>
        <button>Favoritar</button>
      </header>

      {/* Imagem principal do jogo */}
      {gameInfo.photo_files?.length > 0 && (
        <img src={gameInfo.photo_files[0].image} alt={gameInfo.title} className="main-image" />
      )}

      <div className="info-section">
        <div className="info-box">
          <h2>Informações</h2>
          <div>
            <h3>Plataforma:</h3>
            <span className="badge">{gameInfo.platform}</span>
          </div>
          <div>
            <h3>Gênero:</h3>
            <span className="badge">{gameInfo.game_genre}</span>
          </div>
          <div>
            <h3>Faixa etária:</h3>
            <span className="badge">{gameInfo.age_range}</span>
          </div>
          <div>
            <h3>Classificação de Conteúdo:</h3>
            <span className="badge">{gameInfo.content_classification}</span>
          </div>
          <div>
            <h3>Tipo de Jogo:</h3>
            <span className="badge">{gameInfo.game_type}</span>
          </div>
          <div>
            <h3>URL do Projeto:</h3>
            <a href={gameInfo.project_url} target="_blank" rel="noopener noreferrer">
              Acessar projeto
            </a>
          </div>
        </div>
      </div>

      {/* Base curricular associada ao jogo */}
      <div>
        <h2>BNCC - Base Nacional Curricular Comum</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th">Componente</th>
              <th className="th">Unidade Temática</th>
              <th className="th">Objetivos de Conhecimento</th>
              <th className="th">Habilidades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td">{gameInfo.curriculum_base?.component}</td>
              <td className="td">{gameInfo.curriculum_base?.thematic_unit}</td>
              <td className="td">{gameInfo.curriculum_base?.knowledge_objectives}</td>
              <td className="td">{gameInfo.curriculum_base?.skills}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Descrição do jogo */}
      <div>
        <h2>Sobre o Jogo:</h2>
        <p>{gameInfo.informative_text}</p>
      </div>

      {/* Vídeo do jogo (opcional) */}
      {gameInfo.video_url && (
        <div className="video-section">
          <h2>Vídeo do Jogo</h2>
          <a href={gameInfo.video_url} target="_blank" rel="noopener noreferrer">
            Assistir ao vídeo
          </a>
        </div>
      )}

      {/* Galeria de Imagens */}
      <div>
        <h2>Galeria de Imagens</h2>
        <div className="related-games">
          {gameInfo.photo_files?.map((photo, index) => (
            <div key={index} className="related-game">
              <img src={photo.image} alt={`${gameInfo.title} image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
