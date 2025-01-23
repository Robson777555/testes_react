import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { PostCard } from '../PostCard';

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
);

// Validação das props
Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID como string ou número
      title: PropTypes.string.isRequired, // Título é uma string obrigatória
      body: PropTypes.string.isRequired, // Corpo é uma string obrigatória
      cover: PropTypes.string.isRequired, // URL da imagem é uma string obrigatória
    })
  ).isRequired, // A lista de posts é obrigatória
};
