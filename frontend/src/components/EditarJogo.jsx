import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarJogo.css';

const EditarJogo = ({ jogos, onUpdateJogo }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jogo = jogos[id];
  const [title, setTitle] = useState(jogo.title);
  const [accessLinks, setAccessLinks] = useState(jogo.accessLinks);
  const [platform, setPlatform] = useState(jogo.platform);
  const [thinkTest, setThinkTest] = useState(jogo.thinkTest);
  const [glboard, setGlboard] = useState(jogo.glboard);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jogoAtualizado = { ...jogo, title, accessLinks, platform, thinkTest, glboard };
    onUpdateJogo(id, jogoAtualizado);
    navigate('/meusjogos');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Jogo</h1>
      <form className="form-content" onSubmit={handleSubmit}>
        {/* Reutilize os campos do CadastroJogo aqui */}
        <label>
          <span>Título:</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL do Projeto:</span>
          <input
            type="text"
            value={accessLinks}
            onChange={(e) => setAccessLinks(e.target.value)}
          />
        </label>
        <label>
          <span>Plataforma:</span>
          <input
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </label>
        <label>
          <span>ThinkTest:</span>
          <div className="thinktest-group">
            <label>
              <input
                type="radio"
                name="thinktest"
                value="yes"
                checked={thinkTest === 'yes'}
                onChange={(e) => setThinkTest(e.target.value)}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="thinktest"
                value="no"
                checked={thinkTest === 'no'}
                onChange={(e) => setThinkTest(e.target.value)}
              />
              Não
            </label>
          </div>
        </label>
        <label>
          <span>Glboard:</span>
          <div className="glboard-group">
            <label>
              <input
                type="radio"
                name="glboard"
                value="yes"
                checked={glboard === 'yes'}
                onChange={(e) => setGlboard(e.target.value)}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="glboard"
                value="no"
                checked={glboard === 'no'}
                onChange={(e) => setGlboard(e.target.value)}
              />
              Não
            </label>
          </div>
        </label>
        <div className="form-actions">
          <button type="submit" className="submit-button">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarJogo;
