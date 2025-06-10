
export const searchMovies = async (query) => {
  const res = await fetch(`http://localhost:8090/api/movies/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('영화 검색 실패');
  const data = await res.json();
  return data; // TMDB 구조에 따라 조정
};
