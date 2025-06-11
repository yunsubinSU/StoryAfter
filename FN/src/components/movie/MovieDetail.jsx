// src/components/movie/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { Link,useParams } from 'react-router-dom';
import '../../css/movie/MovieDetail.css';

import ReviewList from '../User/ReviewList';

function MovieDetail({movieId,user}) {
  /* ====== 영화 상세 로딩 ====== */
  const { id }      = useParams();
  const [movie, setMovie]   = useState(null);
  const [error, setError]   = useState(null);
  const isLoggedIn = user != null;

  useEffect(() => {
    if (!id) return;

    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("영화 정보를 불러올 수 없습니다.");
        return res.text();
      })
      .then(str => {
        /* XML → JS 객체 변환 */
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
      .catch(err => setError(err.message));
  }, [id]);

  if (error)   return <div>{error}</div>;
  if (!movie)  return <div>로딩 중...</div>;

  return (
    <div className="PageBackground">
      {/* ─────────── 상단(포스터 + 기본 정보) ─────────── */}
      <div className="TopContainer">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`}
          alt={movie.title}
          className="Poster"
        />

        <div className="MovieTextInfo">
          <h1 className="Highlight1">
            {movie.title} ({movie.originalTitle})
          </h1>
          <hr/>

          <div className="MetaInfo">
            <span>런타임: {movie.runtime}분</span>
            <span>평점: {movie.voteAverage}</span>
            <span>개봉일: {movie.releaseDate}</span>
          </div>
          <hr/>

          <div className="CastList">
            {(movie.cast ?? []).slice(0, 6).map(c => (
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
          {/* Story Line */}
          <h3>Story Line</h3>
          <p className="StoryText">{movie.overview}</p>
          <hr />

          {/* Review 리스트 */}
          <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Review
            {isLoggedIn ? (
              <Link to="/review" className="review">
                <button className="WriteReviewBtn">리뷰 작성하기</button>
              </Link>
            ) : (
              <button
                className="WriteReviewBtn"
                onClick={() => alert('로그인 후 리뷰 작성이 가능합니다.')}
              >
                리뷰 작성하기
              </button>
            )}

          </h3>
          <ReviewList movieId={movieId} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
