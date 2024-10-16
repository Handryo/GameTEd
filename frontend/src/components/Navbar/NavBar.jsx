import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './NavBar.css'; // Adicione estilos para a NavBar

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/"><img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true" alt="" /></Link>
        </div>
        <div className="nav-items">
          <div className="nav-links">
            <Link to="/Glboard">GlBoard</Link>
            <Link to="/Thinktest">ThinkTest</Link>
          </div>
          <input
            type="text"
            placeholder="Procure por Jogos ou Conteúdos Didáticos"
            onChange={(event) => console.log(event.target.value)}
          />
          <div className="auth">
            <Link to="/signup">Cadastrar</Link>
            <Link to="/login">Entrar</Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
