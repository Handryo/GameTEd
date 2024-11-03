import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../../hooks/useGame';
import './GamePage.css';

const FALLBACK_IMAGE = 'https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true';

function GamePage() {
  const { gameId } = useParams();
  const [gameInfo, setGameInfo] = useState(null);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const game = await getGameById(Number(gameId));
        if (game) {
          console.log("Dados do jogo:", game);
          setGameInfo(game);
        }
      } catch (error) {
        console.error("Erro ao carregar informações do jogo:", error);
      }
    };
    fetchGameInfo();
  }, [gameId]);

  const videoId = gameInfo?.video_url?.split('v=')[1];
  const videoLink = gameInfo?.video_url || '#';

  const handleIframeError = () => {
    setIframeError(true);
  };

  if (!gameInfo) return <p>Carregando...</p>;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">{gameInfo.title}</h1>
        <button className="favorite-button" title="Favoritar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </header>

      <img
        src={gameInfo.photo_url || FALLBACK_IMAGE}
        alt={`Imagem de ${gameInfo.title}`}
        className="main-image"
        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
      />

      <div className="info-section">
        <div className="info-box">
          <h2>Informações</h2>
          <div className="info-item">
            <h3>Plataforma:</h3>
            <span className="badge">{gameInfo.platform}</span>
          </div>
          <div className="info-item">
            <h3>Gênero:</h3>
            <span className="badge">{gameInfo.game_genre}</span>
          </div>
          <div className="info-item">
            <h3>Faixa etária:</h3>
            <span className="badge">{gameInfo.age_range}</span>
          </div>
          <div className="info-item">
            <h3>Classificação de Conteúdo:</h3>
            <span className="badge">{gameInfo.content_classification}</span>
          </div>
          <div className="info-item">
            <h3>Tipo de Jogo:</h3>
            <span className="badge">{gameInfo.game_type}</span>
          </div>
          <div className="info-item">
            <h3>URL do Projeto:</h3>
            <a href={gameInfo.project_url} target="_blank" rel="noopener noreferrer" className="badge">Acessar projeto</a>
          </div>
        </div>
      </div>

      <div className="curriculum-section">
        <h2>Base Curricular</h2>
        <div className="curriculum-grid">
          <div className="curriculum-item">
            <strong>Componente:</strong> {gameInfo.curriculum_base?.component || "N/A"}
          </div>
          <div className="curriculum-item">
            <strong>Unidade Temática:</strong> {gameInfo.curriculum_base?.thematic_unit || "N/A"}
          </div>
          <div className="curriculum-item">
            <strong>Objetivos de Conhecimento:</strong> {gameInfo.curriculum_base?.knowledge_objectives || "N/A"}
          </div>
          <div className="curriculum-item">
            <strong>Habilidades Desenvolvidas:</strong> {gameInfo.curriculum_base?.skills || "N/A"}
          </div>
        </div>
      </div>

      <div className="description-section">
        <h2>Descrição</h2>
        <p>{gameInfo.informative_text}</p>
      </div>

      <div className="video-section">
        <h2>Vídeo do Jogo</h2>
        {!iframeError && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            className="video-iframe"
            onError={handleIframeError}
            allowFullScreen
          ></iframe>
        ) : (
          <div className="video-placeholder" onClick={() => window.open(videoLink, "_blank")}>
            <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Thumbnail" />
            <div className="play-icon">▶️</div>
          </div>
        )}
        <div className="video-link">
          <a href={videoLink} target="_blank" rel="noopener noreferrer">Assistir no YouTube</a>
        </div>
      </div>
    </div>
  );
}

export default GamePage;