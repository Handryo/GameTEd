// src/components/Card.jsx
import React from 'react';
import './Card.css'; // Verifique se o caminho do CSS está correto

export const Card = ({ title, image, genre, type }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-details">
        <h3 className="card-title">{title}</h3>
        <p className="card-genre">Gênero: {genre}</p>
      </div>
    </div>
  );
};

export default Card; // Exportação padrão
