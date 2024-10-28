// src/components/Modal/CreateModal.jsx
import React, { useState } from 'react';
import './Modal.css';
import useGameDataMutate from '../../hooks/useGameDataMutate';
import TextInput from '../../components/Input/TextInput';
import Button from '../../components/Button/Button';

export default function CreateModal({ closeModal, onGameSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    projectUrl: '',
    gameType: '',
    ageRange: '',
    contentClassification: '',
    gameGenre: '',
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

  const { mutate } = useGameDataMutate();

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
    if (file && file.size <= 69 * 1024 * 1024) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('project_url', formData.projectUrl);
    formDataToSubmit.append('game_type', formData.gameType);
    formDataToSubmit.append('age_range', formData.ageRange);
    formDataToSubmit.append('content_classification', formData.contentClassification);
    formDataToSubmit.append('game_genre', formData.gameGenre);
    formDataToSubmit.append('platform', formData.platform);
    formDataToSubmit.append('informative_text', formData.informativeText);
    
    // Adicionando `curriculumBase` como JSON
    formDataToSubmit.append('curriculum_base', JSON.stringify(formData.curriculumBase));

    // Arquivo de vídeo
    if (videoFile) {
      formDataToSubmit.append('video_file', videoFile);
    }

    // Adicionando arquivos de fotos (opcional)
    photoFiles.forEach((file) => {
      formDataToSubmit.append('photo_files', file);
    });

    // Log do FormData para depuração
    for (let pair of formDataToSubmit.entries()) {
      console.log(`FormData Key: ${pair[0]}, Value: ${pair[1]}`);
    }

    mutate(formDataToSubmit, {
      onSuccess: (newGame) => {
        onGameSubmitted(newGame);
        closeModal();
      },
      onError: (error) => {
        console.error('Erro ao submeter o jogo:', error);
      }
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre seu jogo preenchendo os campos</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Título"
            id="title"
            name="title"
            placeholder="Insira o título do jogo"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          
          <TextInput
            label="URL do projeto"
            id="projectUrl"
            name="projectUrl"
            type="url"
            placeholder="Ex: https://meujogo.com"
            value={formData.projectUrl}
            onChange={handleInputChange}
            required
          />

          <TextInput
            label="Tipo de jogo"
            id="gameType"
            name="gameType"
            placeholder="Ex: Aventura, Educacional"
            value={formData.gameType}
            onChange={handleInputChange}
            required
          />

          <TextInput
            label="Faixa etária"
            id="ageRange"
            name="ageRange"
            placeholder="Ex: 10-12 anos"
            value={formData.ageRange}
            onChange={handleInputChange}
            required
          />

          <TextInput
            label="Classificação de conteúdo"
            id="contentClassification"
            name="contentClassification"
            placeholder="Ex: Livre, 10+, 12+"
            value={formData.contentClassification}
            onChange={handleInputChange}
            required
          />

          <TextInput
            label="Gênero do jogo"
            id="gameGenre"
            name="gameGenre"
            placeholder="Ex: Ação, Puzzle, Estratégia"
            value={formData.gameGenre}
            onChange={handleInputChange}
            required
          />

          <div className="input-container">
            <label htmlFor="videoUpload">Upload de vídeo demonstrativo (MAX 69 MB)</label>
            <input
              type="file"
              id="videoUpload"
              name="videoFile"
              accept="video/*"
              onChange={handleVideoUpload}
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="photoUpload">Upload de fotos (opcional, MAX - 12 fotos)</label>
            <input
              type="file"
              id="photoUpload"
              name="photoFiles"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </div>

          <TextInput
            label="Plataforma"
            id="platform"
            name="platform"
            placeholder="Ex: Web, Android, iOS"
            value={formData.platform}
            onChange={handleInputChange}
            required
          />

          <div className="input-container">
            <label>Base curricular</label>
            <div className="curriculum-grid">
              <TextInput
                id="component"
                name="component"
                placeholder="Componente curricular"
                value={formData.curriculumBase.component}
                onChange={handleCurriculumChange}
                required
              />
              <TextInput
                id="thematicUnit"
                name="thematicUnit"
                placeholder="Unidade Temática"
                value={formData.curriculumBase.thematicUnit}
                onChange={handleCurriculumChange}
                required
              />
              <TextInput
                id="knowledgeObjectives"
                name="knowledgeObjectives"
                placeholder="Objetivos de Conhecimento"
                value={formData.curriculumBase.knowledgeObjectives}
                onChange={handleCurriculumChange}
                required
              />
              <TextInput
                id="skills"
                name="skills"
                placeholder="Habilidades desenvolvidas"
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
              placeholder="Descreva o objetivo e detalhes do jogo"
              value={formData.informativeText}
              onChange={handleInputChange}
              minLength="10"
              maxLength="500"
              required
            ></textarea>
          </div>

          <div className="button-container">
            <Button variant="red" onClick={closeModal}>Cancelar</Button>
            <Button variant="blue" type="submit">Submeter</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
