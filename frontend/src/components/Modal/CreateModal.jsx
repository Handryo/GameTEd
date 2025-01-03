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
    informativeText: '',
    videoUrl: '',
    photoUrl: '' // Alterado para uma única URL de foto
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preparando os dados como FormData
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('project_url', formData.projectUrl);
    formDataToSubmit.append('game_type', formData.gameType);
    formDataToSubmit.append('age_range', formData.ageRange);
    formDataToSubmit.append('content_classification', formData.contentClassification);
    formDataToSubmit.append('game_genre', formData.gameGenre);
    formDataToSubmit.append('platform', formData.platform);

    // Adicionando curriculum_base como campos separados
    formDataToSubmit.append('curriculum_base.component', formData.curriculumBase.component);
    formDataToSubmit.append('curriculum_base.thematic_unit', formData.curriculumBase.thematicUnit);
    formDataToSubmit.append('curriculum_base.knowledge_objectives', formData.curriculumBase.knowledgeObjectives);
    formDataToSubmit.append('curriculum_base.skills', formData.curriculumBase.skills);

    formDataToSubmit.append('informative_text', formData.informativeText);
    formDataToSubmit.append('video_url', formData.videoUrl);
    formDataToSubmit.append('photo_url', formData.photoUrl); // Usando apenas um único campo de URL de foto

    // Verificar dados antes do envio
    for (let [key, value] of formDataToSubmit.entries()) {
      console.log(key, value); // Verifique se todos os dados estão sendo enviados corretamente
    }
    console.log("Dados a serem enviados:", Object.fromEntries(formDataToSubmit.entries()));

    mutate(formDataToSubmit, {
      onSuccess: (newGame) => {
        onGameSubmitted(newGame);
        closeModal();
      },
      onError: (error) => {
        console.error('Erro ao submeter o jogo:', error);
        console.error('Detalhes da resposta do servidor:', error.response?.data);
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

          <TextInput
            label="URL do vídeo demonstrativo"
            id="videoUrl"
            name="videoUrl"
            type="url"
            placeholder="Insira a URL do vídeo"
            value={formData.videoUrl}
            onChange={handleInputChange}
          />

          {/* Campo para uma única URL de foto */}
          <TextInput
            label="URL da foto"
            id="photoUrl"
            name="photoUrl"
            type="url"
            placeholder="Insira a URL da foto"
            value={formData.photoUrl}
            onChange={handleInputChange}
            required
          />

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
