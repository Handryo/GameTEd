import React from 'react';
import './Card.css';

function Card({ id, title, image, genre, onClick, onEdit, showEditButton }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={`Imagem de ${title}`} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-genre">{genre}</p>
      </div>
      {showEditButton && (
        <div className="card-edit-button-container">
          <button
            className="card-edit-button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Editar Jogo
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
