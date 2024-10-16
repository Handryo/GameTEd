import React from 'react';
import { Link } from 'react-router-dom';
import './DevNavBar.css'; // Verifique se o caminho está correto

const DevNavBar = () => {
  return (
    <nav className="dev-navbar">
      <div className="logo">
        <Link to="/desenvolvedorhome">
          <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true" alt="" />
        </Link>
      </div>
      <div className="nav-items">
        <div className="nav-links">
          <Link to="/salasdeteste">Salas de Teste</Link>
          <Link to="/biblioteca">Biblioteca</Link>
          <Link to="/meusjogos">Meus Jogos</Link>
        </div>
        <input
          type="text"
          placeholder="Procure por Jogos ou Conteúdos Didáticos"
          onChange={(event) => console.log(event.target.value)}
        />
      </div>
      <div className="dev-button">
        <Link to="/desenvolvedor">
          <span role="img" aria-label="developer">😃</span> Desenvolvedor
        </Link>
      </div>
    </nav>
  );
};

export default DevNavBar;
