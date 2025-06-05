package com.example.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class MovieDetailDto {
    private Long id;
    private String title;
    private String originalTitle;
    private String overview;
    private String posterPath;
    private Integer runtime;
    private String releaseDate;
    private Double voteAverage;
    private Long budget;
    private Long revenue;
    private List<CastDto> cast;
}
