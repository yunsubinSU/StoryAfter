package com.example.demo.domain.dto;

import com.example.demo.domain.entity.Review;

import java.time.LocalDateTime;

public record ReviewDto(Long id, String username, String content, byte rating, LocalDateTime createdAt) {
    public static ReviewDto from(com.example.demo.domain.entity.Review review) {
        return new ReviewDto(
                review.getId(),
                review.getUser().getUsername(),
                review.getContent(),
                review.getRating(),
                review.getCreatedAt()
        );
    }
}
