import React, { useState, useEffect } from "react";
import { submitReview } from "../api/reviewApi";

const ReviewForm = ({ movieId }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await submitReview(movieId, content, rating, token);
      alert("리뷰 작성 완료");
      setContent("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || "리뷰 작성 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용 작성" required />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}점
          </option>
        ))}
      </select>
      <button type="submit">리뷰 작성</button>
    </form>
  );
};

export default ReviewForm;
