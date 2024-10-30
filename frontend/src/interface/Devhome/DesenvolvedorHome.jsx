import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import Card from '../../components/Card/Card.jsx'; // Importação correta do Card
import { getGames } from '../../hooks/useGameData.js'; // Corrigida a importação de getGames
import './DesenvolvedorHome.css'; 

const DesenvolvedorHome = () => {
  const [gamesList, setGamesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterGenre, setFilterGenre] = useState('');
  const gamesPerPage = 9;
  const navigate = useNavigate(); // Hook de navegação

  // Carrega os jogos ao montar o componente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await getGames();
        setGamesList(games);
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      }
    };
    fetchGames();
  }, []);

  // Obtém lista de gêneros únicos para o filtro
  const genres = [...new Set(gamesList.map(game => game.genre))];

  // Filtra jogos com base no gênero selecionado
  const filteredGames = filterGenre ? gamesList.filter(game => game.genre === filterGenre) : gamesList;

  // Paginação
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  // Números das páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGames.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Função de redirecionamento ao clicar no Card
  const handleCardClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className="developer-home">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Transforme sua experiência de aprendizado!<br/>Divirta-se enquanto aprende!</h1>
          <p>
            Utilize jogos como uma ferramenta de apoio à aprendizagem, explorando o vasto potencial que eles oferecem. Com nosso catálogo de jogos, você pode se divertir enquanto cria turmas, facilitando a interação com estudantes e amigos.<br/>
            Além disso, você pode se envolver na emocionante jornada de desenvolver jogos educacionais, explorando como eles podem ter um impacto profundo e positivo na vida de um estudante, abrindo portas para novas oportunidades de aprendizado.
          </p>
        </div>
        <div className="hero-image">
          <img src="https://raw.githubusercontent.com/WesllenVasconcelos/game_ted_front/main/game-ted/src/assets/devhome.png" alt="Hero Image" />
        </div>
      </header>

      <section className="content-section">
        <aside className="filter-section">
          <h3>Filtros</h3>
          <div className="filters-placeholder">
            {genres.map((genre, index) => (
              <button key={index} onClick={() => setFilterGenre(genre)}>
                {genre}
              </button>
            ))}
            <button onClick={() => setFilterGenre('')}>Mostrar Todos</button>
          </div>
        </aside>

        <main className="games-section">
          <h2>Jogos Educacionais</h2>
          <div className="games-grid">
            {currentGames.length > 0 ? (
              currentGames.map((game) => (
                <Card 
                  key={game.id}
                  image={game.image}
                  title={game.title}
                  genre={game.genre}
                  onClick={() => handleCardClick(game.id)} // Função de clique para redirecionamento
                />
              ))
            ) : (
              <p>Nenhum jogo encontrado</p>
            )}
          </div>
          <div className="pagination">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
        </main>
      </section>

      <footer className="footer-placeholder">
        <p>Espaço reservado para rodapé</p>
      </footer>
    </div>
  );
};

export default DesenvolvedorHome;
