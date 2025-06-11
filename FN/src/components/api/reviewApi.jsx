import axios from "axios";

export const submitReview = async (movieId, content, rating, token) => {
  const reviewData = { movieId, content, rating };

  return axios.post("http://localhost:8090/api/reviews", reviewData, {
    withCredentials: true, 
    headers: {
      "Content-Type": "application/json",

    },
  });
};
