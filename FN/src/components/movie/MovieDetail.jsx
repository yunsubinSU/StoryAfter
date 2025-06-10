import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../../css/movie/MovieDetail.css';
import Propile from '../../img/profiles.png';

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
<div className="PageBackground">
  <div className="TopContainer">
    <img src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`} alt={movie.title} className="Poster" />

    <div className="MovieTextInfo">
    <h1 className="Highlight1">{movie.title} ({movie.originalTitle})</h1><hr/>
  
      <div className="MetaInfo">
        <span>런타임: {movie.runtime}분</span>
        <span>평점: {movie.voteAverage}</span>
        <span>개봉일: {movie.releaseDate}</span>
      </div>
      <hr/>
      <div className="CastList">
        {(movie.cast ?? []).slice(0, 6).map((c) => (
          <div className="CastItem" key={c.name}>
            <img
              src={`https://image.tmdb.org/t/p/w185${c.profilePath}`}
              alt={c.name}
              className="CastImage"
            />
            <div className="CastName">{c.name}</div>
          </div>
        ))}
      </div>

    </div>
  </div>

  <div className="PageBackground1">
    <div className="BottomSection">
        <h3>Story Line</h3>
        <p className="StoryText">{movie.overview}</p>
        <hr />

        <h3>Review</h3>
        {[1, 2, 3].map((_, i) => (
          <div className="ReviewBox" key={i}>
            <div className="Reviewer">
              <img src={Propile} alt="icon" />
              <strong>HOTCHO</strong>
            </div>
            <div className="ReviewContent">
              저런 장면은 일일 일 소장이 하고 싶을 정도입니다.
            </div>
            <div className="ReviewDate">2025/02/03</div>
          </div>
        ))}
      </div>
  </div>
  
</div>

  );
}

export default MovieDetail;
