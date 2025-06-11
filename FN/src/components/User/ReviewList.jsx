import React, { useContext } from "react";
import { ReviewContext } from "../User/ReviewContext";
import "../../css/user/ReviewList.css"; // CSS import

const ReviewList = () => {
  const { reviews } = useContext(ReviewContext);

  return (
    <div className="review-list-container">
      {reviews.length === 0 ? (
        <p style={{ textAlign: "center", color: "#e0e0e0" }}>작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h3>user</h3>
            <p>{review.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
