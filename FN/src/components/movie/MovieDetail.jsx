// src/components/movie/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import '../../css/movie/MovieDetail.css';
import Propile from '../../img/profiles.png';

function MovieDetail() {
  /* ====== 영화 상세 로딩 ====== */
  const { id }      = useParams();
  const [movie, setMovie]   = useState(null);
  const [error, setError]   = useState(null);

  /* ====== 리뷰 (더미) & 페이지네이션 ====== */
  const dummyReviews = [
    { id: 1, nickname: 'HOTCHO', content: '저런 장면은 소장이 하고 싶을 정도입니다.', date: '2025/02/03' },
    { id: 2, nickname: 'HOTGUY', content: '내용 진짜 재미있는데 다들 보세요', date: '2025/02/03' },
    { id: 3, nickname: 'TOTO', content: '진짜 배우가 한 몫했다. 라인업봐봐요', date: '2025/02/03' },
    { id: 4, nickname: 'TOPERM', content: '후속작있겠죠??? 없는거 아니죠??', date: '2025/02/03' },
    { id: 5, nickname: 'SIAME', content: '내 인생에 있어서 이런 영화를 지금에야 봤어요 그만큼 인생작', date: '2025/02/03' },
    { id: 6, nickname: 'ZHFLDK', content: '난 재미없었는데 그냥 캐릭터 자체가 귀여워서 두번 보고 한번보고', date: '2025/02/03' },
  ];
  const REVIEWS_PER_PAGE = 4;
  const [page, setPage] = useState(0);

  const pages   = Math.ceil(dummyReviews.length / REVIEWS_PER_PAGE);
  const current = dummyReviews.slice(
    page * REVIEWS_PER_PAGE,
    (page + 1) * REVIEWS_PER_PAGE
  );

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
            <button className="WriteReviewBtn">리뷰 작성하기</button>
          </h3>
          {current.map(r => (
            <div className="ReviewBox" key={r.id}>
              <div className="Reviewer">
                <img src={Propile} alt="icon" className="propileimg" />
                <strong className="nickname12">{r.nickname}</strong>
              </div>
              <div className="ReviewContent">{r.content}</div>
              <div className="ReviewDate">{r.date}</div>
            </div>
          ))}

          {/* Prev / Next 버튼 (4개 이상일 때만) */}
          {pages > 1 && (
            <div className="ReviewPager">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
              >
                Prev
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === pages - 1}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
