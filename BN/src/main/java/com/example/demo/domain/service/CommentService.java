//package com.example.demo.domain.service;
//
//import com.example.demo.domain.entity.Comment;
//import com.example.demo.repository.CommentRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CommentService {
//
//    private final CommentRepository repo;
//
//    public CommentService(CommentRepository repo) {
//        this.repo = repo;
//    }
//
//    public List<Comment> getComments(Long movieId) {
//        return repo.findByMovieId(movieId);
//    }
//
//    public Comment addComment(Comment c) {
//        return repo.save(c);
//    }
//
//    public void deleteComment(Long id) {
//        repo.deleteById(id);
//    }
//
//    public Comment updateComment(Long id, Comment c) {
//        return repo.findById(id).map(old -> {
//            old.setName(c.getName());
//            old.setPassword(c.getPassword());
//            old.setContent(c.getContent());
//            return repo.save(old);
//        }).orElseThrow(() -> new RuntimeException("Not found"));
//    }
//}
