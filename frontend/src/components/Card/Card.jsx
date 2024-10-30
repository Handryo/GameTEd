import React from 'react';
import './Card.css';

function Card({ title, image, genre, onClick }) {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0} aria-label={`Ver detalhes de ${title}`}>
      {/* Imagem do Card */}
      <img src={image} alt={`Imagem de ${title}`} className="card-image" />
      
      {/* Conteúdo do Card */}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-genre">{genre}</p>
      </div>
    </div>
  );
}

export default Card;
