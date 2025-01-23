import React from 'react';
import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import TextInput from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  const hasMorePosts = page + postsPerPage >= allPosts.length; // Verifica se ainda há mais posts a carregar

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async () => {
    const postsAndPhotos = await loadPosts();
    setAllPosts(postsAndPhotos);
    setPosts(postsAndPhotos.slice(0, postsPerPage)); // Carrega os primeiros posts
  }, [postsPerPage]);

  useEffect(() => {
    handleLoadPosts();
  }, [handleLoadPosts]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    setPosts((prevPosts) => [...prevPosts, ...nextPosts]); // Cria um novo array com os novos posts
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <>
      <section className="container">
        <div className="search-container">
          <div className="colorir">
            {!!searchValue && (
              <>
                <h1>Search value: {searchValue}</h1>
              </>
            )}
          </div>

          <TextInput searchValue={searchValue} handleChange={handleChange} />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {searchValue !== '' && filteredPosts.length === 0 && (
          <p className="colorir">Não existem posts com esse nome!</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Carregar mais posts"
              onClick={loadMorePosts}
              disabled={hasMorePosts} // Define o estado do botão
            />
          )}
        </div>
      </section>
    </>
  );
};
