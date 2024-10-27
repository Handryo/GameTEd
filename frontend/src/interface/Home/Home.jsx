import React, { useState } from 'react';
import "./Home.css";
import Button from "../../components/Button/Button"; // Updated import statement

const Home = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [emailError, setEmailError] = useState('');

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    if (formattedNumber.length <= 14) {
      setCelular(formattedNumber);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes('@')) {
      setEmailError('*Por favor, insira um email válido');
    } else {
      setEmailError('');
    }
  };

  const handleSugestaoChange = (e) => {
    if (e.target.value.length <= 300) {
      setSugestao(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log({ nome, email, celular, sugestao });
  };

  return (
    <div>
      <section className="topo-do-site">
        <div className="interface">
          <div className="flex">
            <div className="txt-topo-site">
              <h1>Divirta-se enquanto aprende <span>.</span></h1>
              <p> Utilize jogos como uma ferramenta de apoio à aprendizagem, explorando o vasto potencial que eles oferecem. Com nosso catálogo de jogos, você pode se divertir enquanto cria turmas, facilitando a interação com estudantes e amigos. 
                Além disso, você pode se envolver na emocionante jornada de desenvolver jogos educacionais, explorando como eles podem ter um impacto profundo e positivo na vida de um estudante, abrindo portas para novas oportunidades de aprendizado.
              </p>
              <div className="bt-contato">
                <a href="#">
                  <Button variant="black" fullWidth>Cadastre-se Agora!</Button>
                </a>
              </div>
            </div>
            <div className="img-topo-site">
              <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/BG1_tela_inicial.png?raw=true" alt="Topo do site" />
            </div>
          </div>
        </div>
      </section>

      <section className="especialidades">
        <div className="interface">
          <h2 className="titulo">NOSSOS USUÁRIOS.</h2>
          <div className="flex">
            <div className="especialidades-box">
              <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/est.png?raw=true" alt="Estudante" />
              <h3>Estudante</h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </div>  
            <div className="especialidades-box">
              <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/prof.png?raw=true" alt="Professor" />
              <h3>Professor</h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </div>  
            <div className="especialidades-box">
              <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/dev.png?raw=true" alt="Desenvolvedor" />
              <h3>Desenvolvedor</h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </div>  
          </div>  
        </div>  
      </section> 

      <section className="sobre">
        <div className="interface">
          <div className="flex">
            <div className="img-sobre">
              <img src="https://github.com/WesllenVasconcelos/game_ted_front/blob/main/game-ted/src/assets/BG2_tela_inicial.png?raw=true" alt="Sobre" />
            </div>
            <div className="txt-sobre">
              <h2> TAREFAS POR JOGOS <span> CONHEÇA NOSSO CATÁLOGO.</span></h2>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nostrum quaerat ducimus quod, sit, quis explicabo cum, distinctio quas obcaecati doloribus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nostrum quaerat ducimus quod, sit, quis explicabo cum, distinctio quas obcaecati doloribus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            </div>
          </div>
        </div>
      </section>

      <section className="formulario">
        <div className="interface">
          <h2 className="titulo">ENVIE UMA SUGESTÃO</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <div className="email-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>
            <input
              type="tel"
              name="celular"
              placeholder="Celular"
              required
              value={celular}
              onChange={handlePhoneChange}
            />
            <textarea
              name="sugestao"
              placeholder="Sua sugestão"
              value={sugestao}
              onChange={handleSugestaoChange}
            ></textarea>
            <div className="character-count">{sugestao.length}/300</div>
            <Button variant="blue" fullWidth type="submit">Enviar</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;