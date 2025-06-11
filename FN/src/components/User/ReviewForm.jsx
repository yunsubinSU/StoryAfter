import React, { useContext, useState } from "react";
import { ReviewContext } from "../User/ReviewContext";
import { useNavigate } from "react-router-dom";
import "../../css/user/ReviewForm.css"; // 꼭 import 해주세요

const ReviewForm = () => {
  const { reviews, setReviews } = useContext(ReviewContext);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setReviews([...reviews, { id: Date.now(), content: text }]);
    setText("");
    navigate(-1);
  };

  return (
    <div className="review-form-container">
      <h2>리뷰 작성</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="리뷰를 입력하세요..."
        />
        <button type="submit">리뷰 작성</button>
      </form>
    </div>
  );
};

export default ReviewForm;
