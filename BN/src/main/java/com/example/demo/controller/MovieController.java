package com.example.demo.controller;

import com.example.demo.domain.dto.MovieDto;
import com.example.demo.domain.service.MovieService;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
