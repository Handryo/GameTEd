import React, { useState } from 'react';
import './SignupPage.css';

import professorImg from '../../assets/Professor.png';
import alunoImg from '../../assets/Aluno.png';
import pesquisadorImg from '../../assets/Pesquisador.png';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, password, confirmPassword, role, terms);
    console.log('Formulário enviado');
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="form-section">
          <h1>Crie uma conta no GAMETED</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Senha:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              Confirmar senha:
              <input
                type="password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <fieldset>
              <legend>Sobre você:</legend>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Sou um(a) Aluno(a)!
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="educator"
                  checked={role === 'educator'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Sou um(a) Educador(a)!
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="developer"
                  checked={role === 'developer'}
                  onChange={(e) => setRole(e.target.value)}
                />
                Sou um(a) Desenvolvedor(a)!
              </label>
              <p className="placeholder">
                Você não poderá mudar essa resposta depois, ela será utilizada para a criação da conta e homologação do sistema então escolha bem.
              </p>
            </fieldset>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              Li e aceito todos os <b>Termos de Serviços</b>
            </label>
            <div className="form-actions">
              <button type="button">Cancelar</button>
              <button type="submit">Criar Conta</button>
            </div>
          </form>
        </div>
        <div className="profile-section">
          <h1>Qual seu perfil?</h1>
          <div className="profile-options">
            <div className="profile-option">
              <div className="profile-text">
                <h3><i>Professor(a):</i></h3>
                <p>Sou educador(a), desejando aplicar os títulos educacionais disponibilizados no site como uma ferramenta de apoio a aprendizagem</p>
              </div>
              <img src={professorImg} alt="Professor" className="profile-image" />
            </div>
            <div className="profile-option">
              <div className="profile-text">
                <h3><i>Jogador(a)/Aluno(a):</i></h3>
                <p>Sou jogador(a)/aluno(a), desejando apenas jogar os títulos disponíveis no site, avaliar jogos educacionais e participar de salas.</p>
              </div>
              <img src={alunoImg} alt="Aluno" className="profile-image" />
            </div>
            <div className="profile-option">
              <div className="profile-text">
                <h3><i>Pesquisador(a)/Desenvolvedor(a):</i></h3>
                <p>Sou pesquisador(a)/desenvolvedor(a), com o desejo de submeter jogos educacionais no intuito de avaliá-los e obter dados personalizados.</p>
              </div>
              <img src={pesquisadorImg} alt="Pesquisador" className="profile-image" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
