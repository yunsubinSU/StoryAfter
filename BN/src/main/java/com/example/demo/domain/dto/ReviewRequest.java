package com.example.demo.domain.dto;

public record ReviewRequest(Long movieId, String content, byte rating) {}