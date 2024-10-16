import React, { useState } from 'react';
import "./Perfil.css";
import profileIcon from '../../assets/profile-icon.png';

const Perfil = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const handlePasswordChange = (event) => {
        event.preventDefault();
        console.log('Senha alterada:', oldPassword, newPassword1, newPassword2);
        console.log('Formulário de senha enviado');
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <h1>Perfil</h1>
            </div>
            <div className="profile-content">
                <div className="profile-section">
                    <div className="profile-picture">
                        <img src={profileIcon} alt="Foto de Perfil" className='photo' />
                        <label htmlFor="fileUpload">Alterar imagem</label>
                        <input type="file" id="fileUpload" />
                    </div>
                </div>
                <div className="profile-info">
                    <h2>Informações do Perfil</h2>
                    <p>Email: {email}</p>
                    <p>Nome: {name}</p>
                </div>
            </div>
            <div className="profile-settings">
                <h2>Alterar senha</h2>
                <form onSubmit={handlePasswordChange}>
                    <label>
                        Senha Atual:
                        <input
                            type="password"
                            name="old_password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Senha Atual"
                            required
                        />
                    </label>
                    <label>
                        Nova Senha:
                        <input
                            type="password"
                            name="new_password1"
                            value={newPassword1}
                            onChange={(e) => setNewPassword1(e.target.value)}
                            placeholder="Nova senha"
                            required
                        />
                    </label>
                    <label>
                        Confirmar Senha:
                        <input
                            type="password"
                            name="new_password2"
                            value={newPassword2}
                            onChange={(e) => setNewPassword2(e.target.value)}
                            placeholder="Confirmar senha"
                            required
                        />
                    </label>
                    <button type="submit">Salvar alterações</button>
                </form>
            </div >
            <div className="button-container">
                <button type="button" className="delete-account-button">
                Excluir conta
            </button>
            </div>
            
        </div>
    );
};

export default Perfil;
