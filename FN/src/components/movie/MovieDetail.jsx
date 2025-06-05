import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("영화 정보를 불러올 수 없습니다.");
        return res.text();  
      })
      .then(str => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "application/xml");

        const getText = tag => xml.querySelector(tag)?.textContent ?? '';

        const movieData = {
          id: Number(getText('id')),
          title: getText('title'),
          originalTitle: getText('originalTitle'),
          overview: getText('overview'),
          posterPath: getText('posterPath'),
          runtime: Number(getText('runtime')),
          releaseDate: getText('releaseDate'),
          voteAverage: Number(getText('voteAverage')),
          budget: Number(getText('budget')),
          revenue: Number(getText('revenue')),
          cast: Array.from(xml.querySelectorAll('cast > cast')).map(castNode => ({
            name: castNode.querySelector('name')?.textContent,
            character: castNode.querySelector('character')?.textContent,
            profilePath: castNode.querySelector('profilePath')?.textContent,
          }))
        };
        setMovie(movieData);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>로딩 중...</div>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>{movie.title} ({movie.originalTitle})</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
        alt={movie.title}
        style={{ width: '100%', borderRadius: 8 }}
      />
      <p>{movie.overview}</p>
      <p>런타임: {movie.runtime}분</p>
      <p>개봉일: {movie.releaseDate}</p>
      <p>평점: {movie.voteAverage}</p>
        <h3>출연진</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {(movie.cast ?? []).map((c) => (
            <li key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <img
                src={`https://image.tmdb.org/t/p/w185${c.profilePath}`}
                alt={c.name}
                style={{ width: 50, height: 75, objectFit: 'cover', borderRadius: 4, marginRight: 10 }}
            />
            <div>
                <strong>{c.name}</strong> - {c.character}
            </div>
            </li>
        ))}
        </ul>
    </div>
  );
}

export default MovieDetail;
