package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.hibernate.query.results.Builders.fetch;

@RestController
@RequestMapping("/oauth")
public class OAuthSuccessController {
    @GetMapping("/success")
    public ResponseEntity<Map<String, String>> oauthSuccess(@RequestParam String username) {
        return ResponseEntity.ok(Map.of("username", username));
        }
    }


