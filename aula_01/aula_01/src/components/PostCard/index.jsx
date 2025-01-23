import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const PostCard = ({ title, cover, body, id }) => (
  <div className="post">
    <img
      src={cover}
      alt={title}
      onError={(e) => (e.target.src = 'https://via.placeholder.com/600')} // Fallback para imagem padrão
    />
    <div className="post-content">
      <h1>
        {title} {id}
      </h1>
      <p>{body}</p>
    </div>
  </div>
);

// Validação das props
PostCard.propTypes = {
  title: PropTypes.string.isRequired, // `title` é uma string obrigatória
  cover: PropTypes.string.isRequired, // `cover` é uma string obrigatória
  body: PropTypes.string.isRequired, // `body` é uma string obrigatória
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // `id` pode ser string ou número, mas é obrigatório
};
