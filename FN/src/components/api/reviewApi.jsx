import axios from 'axios';

export const submitReview = async (movieId, content, rating, token) => {
  console.log("보내는 토큰:", token); // ✅ 여기를 로그로 확인하세요

  return axios.post("/api/reviews", {
    movieId,
    content,
    rating,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};


