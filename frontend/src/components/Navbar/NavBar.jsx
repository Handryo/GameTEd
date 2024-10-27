import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './NavBar.css';
import Button from "../../components/Button/Button"; // Import the Button component

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/logo.png?raw=true" alt="GameTed Logo" />
          </Link>
        </div>
        <div className="nav-items">
          <div className="nav-links">
            <Link to="/Glboard">GlBoard</Link>
            <Link to="/Thinktest">ThinkTest</Link>
          </div>
          {/* Certifique-se de que o input tenha espaço suficiente */}
          <input
            type="text"
            placeholder="Procure por Jogos ou Conteúdos Didáticos"
            onChange={(event) => console.log(event.target.value)}
            className="search-input"
          />
        </div>
        <div className="auth">
          <Link to="/signup">
            <Button variant="blue">Cadastrar</Button>
          </Link>
          <Link to="/login">
            <Button variant="black">Entrar</Button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
