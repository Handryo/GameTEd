import React, { useState, useEffect } from 'react';
import './Modal.css';
import { deleteGame } from '../../hooks/deleteGame.js';
import { updateGame } from '../../hooks/updateGame.js';
import TextInput from '../../components/Input/TextInput';
import Button from '../../components/Button/Button';

const EditModal = ({ gameData, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    projectUrl: '',
    gameType: '',
    ageRange: '',
    contentClassification: '',
    gameGenre: '',
    platform: '',
    component: '',
    thematicUnit: '',
    knowledgeObjectives: '',
    skills: '',
    informativeText: '',
    videoUrl: '',
    photoUrl: ''
  });

  useEffect(() => {
    setFormData({
      title: gameData.title || '',
      projectUrl: gameData.project_url || '',
      gameType: gameData.game_type || '',
      ageRange: gameData.age_range || '',
      contentClassification: gameData.content_classification || '',
      gameGenre: gameData.game_genre || '',
      platform: gameData.platform || '',
      component: gameData.curriculum_base?.component || '',
      thematicUnit: gameData.curriculum_base?.thematic_unit || '',
      knowledgeObjectives: gameData.curriculum_base?.knowledge_objectives || '',
      skills: gameData.curriculum_base?.skills || '',
      informativeText: gameData.informative_text || '',
      videoUrl: gameData.video_url || '',
      photoUrl: gameData.photo_url || ''
    });
  }, [gameData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      title: formData.title,
      project_url: formData.projectUrl,
      game_type: formData.gameType,
      age_range: formData.ageRange,
      content_classification: formData.contentClassification,
      game_genre: formData.gameGenre,
      platform: formData.platform,
      curriculum_base: {
        component: formData.component,
        thematic_unit: formData.thematicUnit,
        knowledge_objectives: formData.knowledgeObjectives,
        skills: formData.skills
      },
      informative_text: formData.informativeText,
      video_url: formData.videoUrl,
      photo_url: formData.photoUrl
    };
  
    console.log("Dados a serem enviados para atualização:", updatedData);
  
    try {
      const result = await updateGame(gameData.id, updatedData);
      if (result) {
        console.log("Jogo atualizado com sucesso:", result);
        onClose();
      } else {
        console.error("A atualização falhou.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o jogo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGame(gameData.id);
      onClose();
    } catch (error) {
      console.error("Erro ao deletar o jogo:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Editar Jogo</h2>
        <form onSubmit={handleUpdate}>
          <TextInput label="Título" id="title" name="title" placeholder="Insira o título do jogo" value={formData.title} onChange={handleInputChange} required />
          <TextInput label="URL do projeto" id="projectUrl" name="projectUrl" type="url" placeholder="Ex: https://meujogo.com" value={formData.projectUrl} onChange={handleInputChange} required />
          <TextInput label="Tipo de jogo" id="gameType" name="gameType" placeholder="Ex: Aventura, Educacional" value={formData.gameType} onChange={handleInputChange} required />
          <TextInput label="Faixa etária" id="ageRange" name="ageRange" placeholder="Ex: 10-12 anos" value={formData.ageRange} onChange={handleInputChange} required />
          <TextInput label="Classificação de conteúdo" id="contentClassification" name="contentClassification" placeholder="Ex: Livre, 10+, 12+" value={formData.contentClassification} onChange={handleInputChange} required />
          <TextInput label="Gênero do jogo" id="gameGenre" name="gameGenre" placeholder="Ex: Ação, Puzzle, Estratégia" value={formData.gameGenre} onChange={handleInputChange} required />
          <TextInput label="URL do vídeo demonstrativo" id="videoUrl" name="videoUrl" type="url" placeholder="Insira a URL do vídeo" value={formData.videoUrl} onChange={handleInputChange} />
          <TextInput label="URL da foto" id="photoUrl" name="photoUrl" type="url" placeholder="Insira a URL da foto" value={formData.photoUrl} onChange={handleInputChange} required />
          <TextInput label="Plataforma" id="platform" name="platform" placeholder="Ex: Web, Android, iOS" value={formData.platform} onChange={handleInputChange} required />

          <TextInput label="Componente curricular" id="component" name="component" placeholder="Componente curricular" value={formData.component} onChange={handleInputChange} required />
          <TextInput label="Unidade Temática" id="thematicUnit" name="thematicUnit" placeholder="Unidade Temática" value={formData.thematicUnit} onChange={handleInputChange} required />
          <TextInput label="Objetivos de Conhecimento" id="knowledgeObjectives" name="knowledgeObjectives" placeholder="Objetivos de Conhecimento" value={formData.knowledgeObjectives} onChange={handleInputChange} required />
          <TextInput label="Habilidades desenvolvidas" id="skills" name="skills" placeholder="Habilidades desenvolvidas" value={formData.skills} onChange={handleInputChange} required />

          <div className="input-container">
            <label htmlFor="informativeText">Texto informativo</label>
            <textarea id="informativeText" name="informativeText" placeholder="Descreva o objetivo e detalhes do jogo" value={formData.informativeText} onChange={handleInputChange} minLength="10" maxLength="500" required></textarea>
          </div>

          <div className="button-container">
            <Button variant="cancel" onClick={onClose}>Cancelar</Button>
            <Button variant="primary" type="submit">Atualizar</Button>
          </div>
        </form>
        <Button variant="danger" onClick={handleDelete}>Apagar</Button>
      </div>
    </div>
  );
};

export default EditModal;
