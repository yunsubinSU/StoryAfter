package com.example.demo.domain.service;

import com.example.demo.domain.dto.MovieDto;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String baseUrl = "https://api.themoviedb.org/3/movie/";

    // 1. 인기/현재상영/예정 영화 목록 조회 (단순 Map 반환)
    public List<Map<String, Object>> fetchMovies(String category) {
        List<String> allowedCategories = Arrays.asList("popular", "now_playing", "upcoming");

        if (!allowedCategories.contains(category)) {
            throw new IllegalArgumentException("지원하지 않는 카테고리: " + category);
        }

        String url = baseUrl + category + "?api_key=" + apiKey + "&language=ko&region=KR";
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return (List<Map<String, Object>>) response.get("results");
    }

    // 2. 최신(now_playing) 영화 + 트레일러 키까지 포함하여 DTO 반환
    public List<MovieDto> getLatestMovies() throws JSONException {
        String url = baseUrl + "now_playing?api_key=" + apiKey + "&language=ko-KR&page=1";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject json = new JSONObject(response.getBody());
        JSONArray results = json.getJSONArray("results");

        List<MovieDto> movies = new ArrayList<>();

        for (int i = 0; i < Math.min(5, results.length()); i++) {
            JSONObject movie = results.getJSONObject(i);
            String movieTitle = movie.getString("title");
            String movieOverview = movie.getString("overview");
            String backdropPath = movie.getString("backdrop_path");

            // 트레일러 요청
            String videoUrl = baseUrl + movie.getInt("id") + "/videos?api_key=" + apiKey + "&language=ko-KR";
            ResponseEntity<Map> videoResponse = restTemplate.getForEntity(videoUrl, Map.class);
            List<Map<String, Object>> videos = (List<Map<String, Object>>) videoResponse.getBody().get("results");

            Optional<Map<String, Object>> trailer = videos.stream()
                    .filter(v -> "YouTube".equals(v.get("site")) && "Trailer".equals(v.get("type")))
                    .findFirst();

            String trailerKey = trailer.map(v -> (String) v.get("key")).orElse(null);

            //DTO 생성
            MovieDto movieDto = new MovieDto(movieTitle, movieOverview, backdropPath, trailerKey);
            movies.add(movieDto);
        }

        return movies;
    }
}
