import React, { useEffect, useState } from 'react';
import axios from 'axios';

const REVIEWS_PER_PAGE = 4;

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setReviews([]);
      setError(null);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        // axios 기본 baseURL 설정이 없으면 절대경로로 변경
        const res = await axios.get(`http://localhost:8090/api/movies/${movieId}/reviews`, {
          withCredentials: true,  // 인증 쿠키 포함 필요시
        });
        setReviews(res.data);
      } catch (err) {
        setError(err.response?.data?.message || '리뷰를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const pages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const currentReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    (page + 1) * REVIEWS_PER_PAGE
  );

  // 페이지 변경 시 스크롤 맨 위로 올리기 (선택사항)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (loading) return <p>리뷰를 불러오는 중...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (reviews.length === 0) return <p>아직 등록된 리뷰가 없습니다.</p>;

  return (
    <div>
      <h3>리뷰 목록</h3>
      <ul>
        {currentReviews.map((review) => (
          <li key={review.id} style={{ marginBottom: '1rem' }}>
            <strong>{review.username || review.nickname}</strong> ({review.rating}점)<br />
            {review.content}<br />
            <small>
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString()
                : '날짜 정보 없음'}
            </small>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 버튼 */}
      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: pages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            style={{
              marginRight: 4,
              fontWeight: page === index ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
