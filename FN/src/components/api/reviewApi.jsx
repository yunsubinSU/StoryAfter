import axios from 'axios';

export async function submitReview(movieId, content, rating, token) {
  const response = await axios.post('/api/reviews', {
    movieId,
    content,
    rating
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  return response.data;
}
