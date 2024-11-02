// Card.jsx
import React from 'react';
import './Card.css';

function Card({ title, image, genre, onClick, onDelete, showDeleteButton }) {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0} aria-label={`Ver detalhes de ${title}`}>
      <img src={image} alt={`Imagem de ${title}`} className="card-image" />
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-genre">{genre}</p>
      </div>

      {/* Botão de Exclusão Condicional */}
      {showDeleteButton && (
        <button 
          className="delete-button" 
          onClick={(e) => { 
            e.stopPropagation(); // Evita acionar o clique do card
            onDelete(); 
          }}
        >
          x
        </button>
      )}
    </div>
  );
}

export default Card;
