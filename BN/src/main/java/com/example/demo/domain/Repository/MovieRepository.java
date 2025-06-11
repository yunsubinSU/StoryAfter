package com.example.demo.domain.Repository;

import com.example.demo.domain.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // 커스텀 쿼리 또는 메서드가 필요하면 여기에 정의
}
