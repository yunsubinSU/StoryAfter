package com.example.demo.domain.service;

import com.example.demo.domain.dto.CastDto;
import com.example.demo.domain.dto.MovieDetailDto;
import com.example.demo.domain.dto.MovieDto;
import com.example.demo.domain.entity.Cast;
import com.example.demo.domain.entity.Movie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

/**
 * 1) TMDB API 호출 (목록/검색/트레일러 등)
 * 2) 로컬 DB(JPA) 조회
 * 두 역할을 모두 담당하는 서비스
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {

    // ======== 1. 외부 API ========
    @Value("${tmdb.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;   // @Bean 으로 등록 필요
    private final String baseUrl = "https://api.themoviedb.org/3/movie/";

    // 인기·현재상영·예정 영화 목록 (Map 형태 그대로 반환)
    public List<Map<String, Object>> fetchMovies(String category) {
        List<String> allowed = List.of("popular", "now_playing", "upcoming");
        if (!allowed.contains(category))
            throw new IllegalArgumentException("지원하지 않는 카테고리: " + category);

        String url = baseUrl + category + "?api_key=" + apiKey + "&language=ko&region=KR";
        Map<?, ?> res = restTemplate.getForObject(url, Map.class);

        return res != null && res.containsKey("results")
                ? (List<Map<String, Object>>) res.get("results")
                : Collections.emptyList();
    }

    // 최신(now_playing) TOP8 + 트레일러 키 포함 DTO
    public List<MovieDto> getLatestMovies() {
        String url = baseUrl + "now_playing?api_key=" + apiKey + "&language=ko-KR&page=1";
        JSONObject json = new JSONObject(restTemplate.getForObject(url, String.class));
        JSONArray results = json.getJSONArray("results");

        List<MovieDto> movies = new ArrayList<>();
        for (int i = 0; i < Math.min(8, results.length()); i++) {
            JSONObject m = results.getJSONObject(i);

            // 트레일러 키 조회
            String vUrl = baseUrl + m.getInt("id") + "/videos?api_key=" + apiKey + "&language=ko-KR";
            Map<?, ?> vRes = restTemplate.getForObject(vUrl, Map.class);
            String trailerKey = ((List<Map<String, Object>>) vRes.get("results")).stream()
                    .filter(v -> "YouTube".equals(v.get("site")) && "Trailer".equals(v.get("type")))
                    .map(v -> (String) v.get("key"))
                    .findFirst().orElse(null);

            movies.add(
                    MovieDto.builder()
                            .id(m.getLong("id"))
                            .title(m.getString("title"))
                            .overview(m.getString("overview"))
                            .backdropPath(m.optString("backdrop_path", null))
                            .posterPath(m.optString("poster_path", null))
                            .trailerKey(trailerKey)
                            .build()
            );
        }
        return movies;
    }

    // 제목 검색
    public List<Map<String, Object>> searchMovies(String query) {
        String q = URLEncoder.encode(query, StandardCharsets.UTF_8);
        String url = "https://api.themoviedb.org/3/search/movie"
                + "?api_key=" + apiKey + "&language=ko-KR&query=" + q;

        ResponseEntity<Map> res = restTemplate.exchange(url, HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders() {{
                    set("Accept", "application/json");
                }}),
                Map.class);

        return res.getBody() != null && res.getBody().containsKey("results")
                ? (List<Map<String, Object>>) res.getBody().get("results")
                : Collections.emptyList();
    }
    public Optional<MovieDetailDto> getDetail(Long id) {
        try {
            String url = baseUrl + id + "?api_key=" + apiKey + "&language=ko-KR";
            String response = restTemplate.getForObject(url, String.class);
            if (response == null) return Optional.empty();

            JSONObject json = new JSONObject(response);

            // Cast 조회
            String castUrl = baseUrl + id + "/credits?api_key=" + apiKey + "&language=ko-KR";
            String castResponse = restTemplate.getForObject(castUrl, String.class);

            List<CastDto> castList = new ArrayList<>();
            if (castResponse != null) {
                JSONObject castJson = new JSONObject(castResponse);
                JSONArray castArray = castJson.getJSONArray("cast");
                for (int i = 0; i < Math.min(10, castArray.length()); i++) {
                    JSONObject c = castArray.getJSONObject(i);
                    castList.add(CastDto.builder()
                            .name(c.optString("name"))
                            .character(c.optString("character"))
                            .profilePath(c.optString("profile_path"))
                            .build());
                }
            }

            MovieDetailDto dto = MovieDetailDto.builder()
                    .id(json.getLong("id"))
                    .title(json.optString("title"))
                    .originalTitle(json.optString("original_title"))
                    .overview(json.optString("overview"))
                    .posterPath(json.optString("poster_path"))
                    .runtime(json.optInt("runtime"))
                    .releaseDate(json.optString("release_date"))
                    .voteAverage(json.optDouble("vote_average"))
                    .budget(json.optLong("budget"))
                    .revenue(json.optLong("revenue"))
                    .cast(castList)
                    .build();

            return Optional.of(dto);

        } catch (Exception e) {
            log.error("TMDB API 상세 조회 실패", e);
            return Optional.empty();
        }
    }


}
