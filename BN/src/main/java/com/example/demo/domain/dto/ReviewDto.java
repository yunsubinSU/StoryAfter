package com.example.demo.domain.dto;

public record ReviewDto(Long id, Long movieId, String content, byte rating, String username) {}
