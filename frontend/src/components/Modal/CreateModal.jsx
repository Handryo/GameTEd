import React, { useState } from 'react';
import './Modal.css';
import { addGame } from '../../services/gameService'; // Mantendo o import original

export default function CreateModal({ closeModal, onGameSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    projectUrl: '',
    gameType: '',
    ageRange: '',
    contentClassification: '',
    gameGenre: '',
    gboard: '',
    thinktest: '',
    platform: '',
    curriculumBase: {
      component: '',
      thematicUnit: '',
      knowledgeObjectives: '',
      skills: ''
    },
    informativeText: ''
  });
  const [videoFile, setVideoFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCurriculumChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      curriculumBase: {
        ...prevState.curriculumBase,
        [name]: value
      }
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 69 * 1024 * 1024) { // Limite de 69 MB
      setVideoFile(file);
    } else {
      alert('O vídeo deve ter no máximo 69 MB.');
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 12) {
      setPhotoFiles(files);
    } else {
      alert('Você pode enviar no máximo 12 fotos.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addGame({ ...formData, videoFile, photoFiles }); // Utilizando a função addGame
      onGameSubmitted(formData);
      closeModal();
    } catch (error) {
      console.error('Erro ao submeter o jogo:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre seu jogo preenchendo os campos</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          <img src="" alt="" />
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="projectUrl">URL do projeto</label>
            <input
              type="url"
              id="projectUrl"
              name="projectUrl"
              value={formData.projectUrl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="gameType">Tipo de jogo</label>
            <input
              type="text"
              id="gameType"
              name="gameType"
              value={formData.gameType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="ageRange">Faixa etária</label>
            <input
              type="text"
              id="ageRange"
              name="ageRange"
              value={formData.ageRange}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="contentClassification">Classificação de conteúdo</label>
            <input
              type="text"
              id="contentClassification"
              name="contentClassification"
              value={formData.contentClassification}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="gameGenre">Gênero do jogo</label>
            <input
              type="text"
              id="gameGenre"
              name="gameGenre"
              value={formData.gameGenre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="videoUpload">Upload de vídeo demonstrativo (MAX 69 MB)</label>
            <input
              type="file"
              id="videoUpload"
              accept="video/*"
              onChange={handleVideoUpload}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="photoUpload">Upload de fotos (MAX - 12 fotos)</label>
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="platform">Plataforma</label>
            <input
              type="text"
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-container">
            <label>Base curricular</label>
            <div className="curriculum-grid">
              <input
                type="text"
                name="component"
                placeholder="Componente"
                value={formData.curriculumBase.component}
                onChange={handleCurriculumChange}
                required
              />
              <input
                type="text"
                name="thematicUnit"
                placeholder="Unidade Temática"
                value={formData.curriculumBase.thematicUnit}
                onChange={handleCurriculumChange}
                required
              />
              <input
                type="text"
                name="knowledgeObjectives"
                placeholder="Objetivos de Conhecimento"
                value={formData.curriculumBase.knowledgeObjectives}
                onChange={handleCurriculumChange}
                required
              />
              <input
                type="text"
                name="skills"
                placeholder="Habilidades"
                value={formData.curriculumBase.skills}
                onChange={handleCurriculumChange}
                required
              />
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="informativeText">Texto informativo</label>
            <textarea
              id="informativeText"
              name="informativeText"
              value={formData.informativeText}
              onChange={handleInputChange}
              minLength="10"
              maxLength="500"
              required
            ></textarea>
          </div>

          <div className="button-container">
            <button type="button" className="btn-secondary cancel" onClick={closeModal}>Cancelar</button>
            <button type="submit" className="btn-secondary">Submeter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
