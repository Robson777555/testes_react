export const loadPosts = async () => {
    const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsJson = await postsResponse.json();
  
    const postsAndPhotos = await Promise.all(postsJson.map(async (post) => {
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${post.id}`);
      const photosJson = await photosResponse.json();
      const cover = photosJson[0]?.url || "https://via.placeholder.com/600"; // Verifica se há uma URL válida
      return { ...post, cover };
    }));

    return postsAndPhotos;
}