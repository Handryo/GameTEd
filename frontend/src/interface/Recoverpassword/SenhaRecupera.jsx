import React from "react";
import './SenhaRecupera.css';
import { Outlet, Link } from 'react-router-dom';
const RecuperaSenha = () => {
    return(
        <div className="recupera-senha-container">
            <div className="recupera-senha-box">
                <h1> Recuperação de Senha</h1>
                <h4>Siga as instruções</h4>
                <p>* Aguarde o envio do código para o endereço de email;</p>
                <p>* Tente novamente, caso o email não tenha sido enviado após 45 segundos;</p>
                <div className="form-section-recupera">
                    <form>
                        <label>
                            Email:
                            <input type="email" name="email" placeholder="Insira o endereço da senha perdida"/>
                        </label>
                        <div className="form-action">
                            <button type="enviar">Enviar E-mail</button>      
                        </div>
                        <label>
                            Código:
                            <input type="text" name="codigo" placeholder="Campo necessário"/>
                        </label>
                        <div className="form-action">
                            <button type="codigo">Confirmar</button>      
                        </div>
                    </form>
                </div>
                <div className="recupera-links">
                    Ou <Link to="/signup" className="custom-link">Crie uma conta</Link> *
                    <Link to="/login" className="custom-link"> Realize o login</Link>
                </div>
            </div>
            <div className="recupera-creditos">
                <p>© 2024 GAMETED. Site desenvolvido pela equipe ThinkTEd</p>
            </div>
            <Outlet />
        </div>
    );
};
export default RecuperaSenha;