// src/components/CreateModal.jsx
import React, { useState } from 'react';
import './Modal.css';
import { addGame } from '../../services/gameService';

export const CreateModal = ({ closeModal, onGameAdded }) => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Gera um ID único para o novo jogo
            const newGame = { 
                id: `${Date.now()}-${Math.random()}`, // ID único gerado
                title, 
                genre, 
                image 
            };

            const createdGame = await addGame(newGame);

            alert('Jogo criado com sucesso!');
            if (typeof onGameAdded === 'function') {
                onGameAdded(createdGame); // Atualiza o estado local com o novo jogo
            }
            closeModal();
        } catch (error) {
            alert('Erro ao criar jogo');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Criar Novo Jogo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="title">Título</label>
                        <input 
                            type="text" 
                            id="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="genre">Gênero</label>
                        <input 
                            type="text" 
                            id="genre" 
                            value={genre} 
                            onChange={(e) => setGenre(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="image">Imagem</label>
                        <input 
                            type="text" 
                            id="image" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn-secondary">Submeter</button>
                        <button type="button" className="btn-secondary cancel" onClick={closeModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
