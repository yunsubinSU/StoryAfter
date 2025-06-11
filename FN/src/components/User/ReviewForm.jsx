import React, { useState } from "react";
import { submitReview } from "../api/reviewApi";

const ReviewForm = ({ movieId, token }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    if (rating < 1 || rating > 5) {
      alert("평점은 1에서 5 사이여야 합니다.");
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
      <div>
        <label>리뷰 내용:</label><br />
        <textarea
          rows={5}
          cols={50}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="영화에 대한 솔직한 후기를 남겨주세요."
          required
        />
      </div>

      <div>
        <label>평점:</label><br />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}점
            </option>
          ))}
        </select>
      </div>

      <button type="submit">리뷰 작성</button>
    </form>
  );
};

export default ReviewForm;
