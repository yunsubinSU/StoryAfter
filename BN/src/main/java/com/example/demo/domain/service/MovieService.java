package com.example.demo.domain.service;

import com.example.demo.domain.dto.MovieDto;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MovieService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    // 최신 영화를 가져오는 메서드
    public List<MovieDto> getLatestMovies() throws JSONException {
        String url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&language=ko-KR&page=1";
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        JSONObject json = new JSONObject(response.getBody());
        JSONArray results = json.getJSONArray("results");

        List<MovieDto> movies = new ArrayList<>();

        // 상위 5개의 영화만 가져오기
        for (int i = 0; i < Math.min(5, results.length()); i++) {
            JSONObject movie = results.getJSONObject(i);
            String movieTitle = movie.getString("title");
            String movieOverview = movie.getString("overview");
            String backdropPath = movie.getString("backdrop_path");

            // 트레일러 정보 가져오기
            String videoUrl = "https://api.themoviedb.org/3/movie/" + movie.getInt("id") + "/videos?api_key=" + apiKey + "&language=ko-KR";
            ResponseEntity<Map> videoResponse = restTemplate.getForEntity(videoUrl, Map.class);
            List<Map<String, Object>> videos = (List<Map<String, Object>>) videoResponse.getBody().get("results");

            // YouTube 트레일러만 필터링
            Optional<Map<String, Object>> trailer = videos.stream()
                .filter(v -> "YouTube".equals(v.get("site")) && "Trailer".equals(v.get("type")))
                .findFirst();

            // 트레일러 키를 MovieDto에 설정
            String trailerKey = trailer.map(v -> (String) v.get("key")).orElse(null);

            // MovieDto에 트레일러 키와 다른 정보들 설정
            MovieDto movieDto = new MovieDto(
                movieTitle,
                movieOverview,
                backdropPath,
                trailerKey
            );
            movies.add(movieDto);
        }

        return movies;
    }
}
