package com.example.demo.controller;


import com.example.demo.domain.dto.MovieDetailDto;
import com.example.demo.domain.dto.MovieDto;
import com.example.demo.domain.service.MovieService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://127.0.0.1:3000","http://localhost:3000"})
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/latest")
    public List<MovieDto> getLatestMovies() {
        return movieService.getLatestMovies();
    }

    @GetMapping("/latest-trailers")
    public List<MovieDto> getLatestTrailers() {
        return movieService.getLatestMovies();
    }

    @GetMapping("/category/{category}")
    public List<Map<String, Object>> getMoviesByCategory(@PathVariable String category) {
        return movieService.fetchMovies(category);
    }

    @GetMapping(value = "/search", produces = "application/json")
    public List<Map<String, Object>> searchMovies(@RequestParam String query) {
        if(query == null || query.trim().length() < 2){
            throw new IllegalArgumentException("검색어는 2글자 이상 입력해주세요.");
        }
        return movieService.searchMovies(query.trim());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetailDto> getMovieDetail(@PathVariable Long id) {
        return movieService.getDetail(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
