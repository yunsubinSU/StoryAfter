package com.example.demo.controller;

import com.example.demo.domain.dto.ReviewDto;
import com.example.demo.domain.dto.ReviewRequest;
import com.example.demo.domain.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewDto> writeReview(
            @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        ReviewDto review = reviewService.writeReview(
                request.movieId(),
                userDetails.getUsername(),
                request.content(),
                request.rating()
        );

        return ResponseEntity.ok(review);
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ReviewDto>> getReviewsByMovieId(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewsByMovieId(movieId));
    }
}
