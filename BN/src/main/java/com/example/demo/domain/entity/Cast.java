
package com.example.demo.domain.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String character;
    private String profilePath;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;
}
