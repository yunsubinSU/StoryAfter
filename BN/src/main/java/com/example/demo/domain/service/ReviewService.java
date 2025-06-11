package com.example.demo.domain.service;

import com.example.demo.domain.Repository.MovieRepository;
import com.example.demo.domain.Repository.ReviewRepository;
import com.example.demo.domain.Repository.UserRepository;
import com.example.demo.domain.dto.ReviewDto;
import com.example.demo.domain.entity.Movie;
import com.example.demo.domain.entity.Review;
import com.example.demo.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final MovieRepository movieRepo;
    private final UserRepository userRepo;

    // 리뷰 작성
    @Transactional
    public ReviewDto writeReview(Long movieId, String username, String content, byte rating) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));

        if (reviewRepo.existsByMovieAndUser(movie, user)) {
            throw new IllegalStateException("이미 작성했습니다");
        }

        Review review = new Review();
        review.setUser(user);
        review.setMovie(movie);
        review.setContent(content);
        review.setRating(rating);

        return ReviewDto.from(reviewRepo.save(review));
    }

    // 리뷰 목록 조회
    public List<ReviewDto> getReviewsByMovieId(Long movieId) {
        List<Review> reviews = reviewRepo.findByMovie_Id(movieId);
        return reviews.stream()
                .map(ReviewDto::from)
                .collect(Collectors.toList());
    }
}
