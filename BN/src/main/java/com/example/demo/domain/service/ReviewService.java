package com.example.demo.domain.service;

import com.example.demo.domain.dto.ReviewDto;
import com.example.demo.domain.entity.Review;
import com.example.demo.domain.Repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewDto writeReview(Long movieId, String username, String content, byte rating) {
        Review review = Review.builder()
                .movieId(movieId)
                .username(username)
                .content(content)
                .rating(rating)
                .build();

        Review saved = reviewRepository.save(review);
        return new ReviewDto(saved.getId(), saved.getMovieId(), saved.getContent(), saved.getRating(), saved.getUsername());
    }

    public List<ReviewDto> getReviewsByMovieId(Long movieId) {
        return reviewRepository.findByMovieId(movieId).stream()
                .map(r -> new ReviewDto(r.getId(), r.getMovieId(), r.getContent(), r.getRating(), r.getUsername()))
                .toList();
    }
}

