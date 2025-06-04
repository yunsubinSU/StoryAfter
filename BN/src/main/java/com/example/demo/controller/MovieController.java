package com.example.demo.controller;

import com.example.demo.domain.dto.MovieDto;
import com.example.demo.domain.service.MovieService;
import org.json.JSONException;
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

    @GetMapping("/{category}")
    public List<Map<String, Object>> getMoviesByCategory(@PathVariable String category) {
        return movieService.fetchMovies(category);
    }
}
