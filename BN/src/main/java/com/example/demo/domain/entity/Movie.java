package com.example.demo.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import com.example.demo.domain.entity.Cast;


import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Movie {
    @Id
    private Long id;
    private String title;
    private String originalTitle;
    private String overview;
    private String posterPath;
    private String backdropPath;
    private String category;
    private Integer runtime;
    private String releaseDate;
    private Double voteAverage;
    private Long budget;
    private Long revenue;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cast> cast = new ArrayList<>();
}
