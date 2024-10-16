import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastraJogo.css';

const CadastraJogo = ({ onAddJogo }) => {
  // Estado para os novos campos
  const [formData, setFormData] = useState({
    nomeJogo: '',
    participantes: '',
    versao: '',
    disciplina: '',
    topico: '',
    nivelEnsino: '',
    idadeRecomendada: '',
    serie: '',
    objetivoAprendizagem: '',
    sistemaOperacional: '',
    espacoDisco: '',
    requisitosAdicionais: '',
    ferramentas: '',
    midiasAdicionais: '',
    title: '',
    accessLinks: '',
    platform: '',
    thinkTest: false, // Agora é booleano para caixa de seleção
    glboard: false,   // Agora é booleano para caixa de seleção
    gameType: '',
    ageRating: '',
    contentRating: '',
    gameGenre: '',
    imageLink: '',
    videoLink: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Supondo que você esteja enviando os dados para uma API
        const response = await axios.post('/games', novoJogo);
        
        // Chama a função onAddJogo para atualizar o estado no componente pai
        onAddJogo(response.data);

        // Mensagem de sucesso
        setSuccessMessage('Jogo criado com sucesso!');

        // Limpar o formulário e redirecionar após 2 segundos
        setTimeout(() => {
            setSuccessMessage('');
            setFormData({
                nomeJogo: '',
                participantes: '',
                versao: '',
                disciplina: '',
                topico: '',
                nivelEnsino: '',
                idadeRecomendada: '',
                serie: '',
                objetivoAprendizagem: '',
                sistemaOperacional: '',
                espacoDisco: '',
                requisitosAdicionais: '',
                ferramentas: '',
                midiasAdicionais: '',
                title: '',
                accessLinks: '',
                platform: '',
                thinkTest: false,
                glboard: false,
                gameType: '',
                ageRating: '',
                contentRating: '',
                gameGenre: '',
                imageLink: '',
                videoLink: '',
            });
            navigate('/meusjogos');
        }, 2000);
    } catch (error) {
        console.error('Erro ao criar o jogo', error);
    }

    const novoJogo = {
      jogo_metadados: {
        identificacao: {
          nome: formData.nomeJogo,
          producao: formData.participantes,
          versao: formData.versao,
        },
        classificacao_curricular: {
          disciplina: formData.disciplina,
          topico: formData.topico,
          nivel_ensino: formData.nivelEnsino,
        },
        publico_alvo: {
          idade_recomendada: formData.idadeRecomendada,
          serie: formData.serie,
        },
        resultados_aprendizagem: {
          objetivo_aprendizagem: formData.objetivoAprendizagem,
        },
        requisitos_tecnicos: {
          sistema_operacional: formData.sistemaOperacional,
          espaco_disco: formData.espacoDisco,
          requisitos_adicionais: formData.requisitosAdicionais,
        },
        recursos_ferramentas: {
          ferramentas: formData.ferramentas,
          midias_adicionais: formData.midiasAdicionais,
        },
        dados_jogo: {
          title: formData.title,
          accessLinks: formData.accessLinks,
          platform: formData.platform,
          thinkTest: formData.thinkTest,
          glboard: formData.glboard,
          gameType: formData.gameType,
          ageRating: formData.ageRating,
          contentRating: formData.contentRating,
          gameGenre: formData.gameGenre,
          imageLink: formData.imageLink,
          videoLink: formData.videoLink,
        },
      },
    };

    onAddJogo(novoJogo);

    setSuccessMessage('Jogo criado com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
      setFormData({
        nomeJogo: '',
        participantes: '',
        versao: '',
        disciplina: '',
        topico: '',
        nivelEnsino: '',
        idadeRecomendada: '',
        serie: '',
        objetivoAprendizagem: '',
        sistemaOperacional: '',
        espacoDisco: '',
        requisitosAdicionais: '',
        ferramentas: '',
        midiasAdicionais: '',
        title: '',
        accessLinks: '',
        platform: '',
        thinkTest: false,
        glboard: false,
        gameType: '',
        ageRating: '',
        contentRating: '',
        gameGenre: '',
        imageLink: '',
        videoLink: '',
      });
      navigate('/meusjogos');
    }, 2000);
  };

  return (
    <div className="cadastra-jogo-container">
      <h1 className="cadastra-jogo-title">Formulário de Submissão</h1>
      {successMessage && <div className="cadastra-jogo-success-message">{successMessage}</div>}
      <form className="cadastra-jogo-form" onSubmit={handleSubmit}>
        <div className="cadastra-jogo-metadados">
          <h2>Metadados do Jogo</h2>
          {[
            { label: 'Nome do Jogo', name: 'nomeJogo' },
            { label: 'Participante(s)', name: 'participantes' },
            { label: 'Versão', name: 'versao' },
            {
              label: 'Disciplina', name: 'disciplina', type: 'dropdown', options: [
                'Matemática', 'Ciências', 'História', 'Geografia', 'Língua Portuguesa'
              ]
            },
            {
              label: 'Tópico', name: 'topico', type: 'dropdown', options: [
                'Álgebra', 'Biologia', 'Revolução Industrial', 'Geopolítica', 'Gramática'
              ]
            },
            {
              label: 'Nível de Ensino', name: 'nivelEnsino', type: 'dropdown', options: [
                'Educação Infantil', 'Ensino Fundamental I', 'Ensino Fundamental II', 'Ensino Médio'
              ]
            },
            {
              label: 'Idade Recomendada', name: 'idadeRecomendada', type: 'dropdown', options: [
                '3-5 anos', '6-8 anos', '9-11 anos', '12-14 anos', '15-18 anos'
              ]
            },
            {
              label: 'Série', name: 'serie', type: 'dropdown', options: [
                '1ª Série', '2ª Série', '3ª Série', '4ª Série', '5ª Série'
              ]
            },
            {
              label: 'Objetivo de Aprendizagem', name: 'objetivoAprendizagem', type: 'dropdown', options: [
                'Resolução de problemas', 'Leitura e Interpretação', 'Pensamento crítico', 'Habilidades Socioemocionais'
              ]
            },
            {
              label: 'Sistema Operacional', name: 'sistemaOperacional', type: 'dropdown', options: [
                'Windows', 'macOS', 'Linux', 'Android', 'iOS', 'Desplugado'
              ]
            },
            {
              label: 'Plataforma', name: 'platform', type: 'dropdown', options: [
                'Web', 'Desktop', 'Mobile', 'Consoles', 'Multiplataforma'
              ]
            },
            { label: 'Espaço em Disco', name: 'espacoDisco' },
            { label: 'Requisitos Adicionais', name: 'requisitosAdicionais' },
            { label: 'Ferramentas', name: 'ferramentas' },
            { label: 'Mídias Adicionais', name: 'midiasAdicionais' },
            { label: 'Título', name: 'title' },
            { label: 'Link de Acesso', name: 'accessLinks' },
            // Campos para caixas de seleção
            { label: 'ThinkTest', name: 'thinkTest', type: 'checkbox' },
            { label: 'Glboard', name: 'glboard', type: 'checkbox' },
            // Campos para dropdowns
            {
              label: 'Tipo de Jogo', name: 'gameType', type: 'dropdown', options: [
                'Aventura', 'Puzzle', 'Estratégia', 'Esportes', 'RPG'
              ]
            },
            {
              label: 'Faixa Etária', name: 'ageRating', type: 'dropdown', options: [
                'Livre', '10+', '12+', '16+', '18+'
              ]
            },
            {
              label: 'Classificação de Conteúdo', name: 'contentRating', type: 'dropdown', options: [
                'Livre', 'Violência', 'Drogas', 'Linguagem Imprópria', 'Conteúdo Sexual'
              ]
            },
            {
              label: 'Gênero', name: 'gameGenre', type: 'dropdown', options: [
                'Ação', 'Aventura', 'Simulação', 'RPG', 'Esportes'
              ]
            },
            { label: 'Link da Imagem', name: 'imageLink' },
            { label: 'Link do Vídeo', name: 'videoLink' },
          ].map((field) => (
            <label key={field.name}>
              <span>{field.label}:</span>
              {field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                />
              ) : field.type === 'dropdown' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>
        <div className="cadastra-jogo-submit-container">
          <button className="cadastra-jogo-submit-button" type="submit">Submeter Jogo</button>
        </div>
      </form>
    </div>
  );
};

export default CadastraJogo;
