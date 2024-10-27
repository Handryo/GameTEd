import React, { useState } from 'react';
import './GamePage.css';

function GamePage() {
  const gameInfo = {
    title: "Gramática",
    version: "GLA",
    mainImage: "https://example.com/gramatica-game.jpg",
    platforms: ["Windows 7 e 8", "Web", "Linux"],
    genres: ["Educativo", "RPG", "Puzzle"],
    ageRange: "9+ anos",
    rating: 4.4,
    ratingCount: 126,
    creators: [
      { name: "Creator1", avatar: "https://example.com/avatar1.jpg" },
      { name: "Creator2", avatar: "https://example.com/avatar2.jpg" },
      { name: "Creator3", avatar: "https://example.com/avatar3.jpg" },
    ],
    description: "Bem-vindo à Gramática, um jogo educacional que transforma o aprendizado de português em uma jornada divertida e envolvente! Explore um mundo mágico cheio de desafios criativos e aprimore suas habilidades linguísticas enquanto se diverte.",
    comments: [
      { user: "Usuário123", comment: "Gostei bastante do jogo!!!" },
      { user: "Jogador456", comment: "Realmente é um jogo muito interessante, espero ver uma sequência!!!" },
    ],
    relatedGames: ["Filo Game", "Ecologic", "Gramática", "Mikuap Teram", "Procurando Pets", "Doce Sort"],
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          {gameInfo.title} <span className="version">{gameInfo.version}</span>
        </h1>
        <button>Favoritar</button>
      </header>

      <img src={gameInfo.mainImage} alt={gameInfo.title} className="main-image" />

      <div className="info-section">
        <div className="info-box">
          <h2>Informações</h2>
          <div>
            <h3>Plataforma:</h3>
            {gameInfo.platforms.map((platform, index) => (
              <span key={index} className="badge">{platform}</span>
            ))}
          </div>
          <div>
            <h3>Gênero:</h3>
            {gameInfo.genres.map((genre, index) => (
              <span key={index} className="badge">{genre}</span>
            ))}
          </div>
          <div>
            <h3>Faixa etária:</h3>
            <span className="badge">{gameInfo.ageRange}</span>
          </div>
        </div>
        <div className="rating-box">
          <h2>Avaliações</h2>
          <p>{gameInfo.ratingCount} Avaliações</p>
          <div>😃🙂😐🙁😞</div>
          <p>Nota: {gameInfo.rating}</p>
          <button>Baixar Jogo</button>
          <button>Compartilhar</button>
        </div>
      </div>

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
              <td className="td">Português</td>
              <td className="td">Gêneros Textuais e Variabilidades Linguísticas</td>
              <td className="td">Compreender a diversidade de gêneros textuais e suas características linguísticas</td>
              <td className="td">Identificar e analisar características textuais e linguísticas de diferentes gêneros</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="creator-section">
        <h2>Criadores e colaboradores:</h2>
        {gameInfo.creators.map((creator, index) => (
          <img key={index} src={creator.avatar} alt={creator.name} className="creator-avatar" />
        ))}
        <p>Educadores e linguistas, colaboradores incríveis da Gramática, trazem paixão e expertise ao jogo educacional que aprimora a experiência centrada no aluno.</p>
      </div>

      <div>
        <h2>Sobre o Jogo:</h2>
        <p>{gameInfo.description}</p>
      </div>

      <div className="comment-section">
        <h2>Comentários</h2>
        {gameInfo.comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user}</strong>
            <p>{comment.comment}</p>
          </div>
        ))}
        <textarea placeholder="Adicione um comentário..."></textarea>
        <button>Comentar</button>
      </div>

      <div>
        <h2>Outros títulos:</h2>
        <div className="related-games">
          {gameInfo.relatedGames.map((game, index) => (
            <div key={index} className="related-game">
              <img src={`https://example.com/${game.toLowerCase().replace(' ', '-')}.jpg`} alt={game} style={{ width: '100%', height: 'auto' }} />
              <p>{game}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GamePage;
