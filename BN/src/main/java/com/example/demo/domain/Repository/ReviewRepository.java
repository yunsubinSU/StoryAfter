package com.example.demo.domain.Repository;

import com.example.demo.domain.entity.Movie;
import com.example.demo.domain.entity.Review;
import com.example.demo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByMovieAndUser(Movie movie, User user);
    Page<Review> findByMovie_Id(Long movieId, Pageable pageable);
    List<Review> findByMovie_Id(Long movieId);

}

