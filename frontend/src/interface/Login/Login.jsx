import React from 'react';
import { useState } from 'react';
import "./Login.css"
import GTD from '../../assets/GTD.png';
import { Outlet, Link } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubimit = (event) => {
        event.preventDefault();
        console.log(username, password)
        console.log("Envio");
    };
    return (
        <div className="container">
            <div className='container1'>
                <form onSubmit={handleSubimit}>
                    <h1>Seja, Bem-Vindo!</h1>
                    <div className='input-field'>
                        <input type="email" placeholder='E-mail'
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='input-field'>
                        <input type="password" placeholder='Senha'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='recall-forget'>
                        <label>
                            <input type="checkbox" />
                            Lembre de mim
                        </label>
                        <Link to="/recupera">Esqueceu a senha?</Link>
                    </div>

                    <button>Entrar</button>

                    <div className='signup-link'>
                        <p>
                            <Link to="/signup">Não tem uma conta?</Link>
                        </p>
                    </div>
                </form>
            </div>

            <div className='Descrição'>
                <img src={GTD} alt="#" />
            </div>
            <Outlet />
        </div>
    )
}

export default Login