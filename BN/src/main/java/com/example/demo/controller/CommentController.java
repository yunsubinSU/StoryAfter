//package com.example.demo.controller;
//
//import com.example.demo.domain.entity.Comment;
//import com.example.demo.domain.service.CommentService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/movies/{movieId}/comments")
//public class CommentController {
//
//    private final CommentService service;
//
//    public CommentController(CommentService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<Comment> getComments(@PathVariable Long movieId) {
//        return service.getComments(movieId);
//    }
//
//    @PostMapping
//    public Comment addComment(@PathVariable Long movieId, @RequestBody Comment comment) {
//        comment.setMovieId(movieId); // movieId 설정
//        return service.addComment(comment);
//    }
//
//    @PutMapping("/{commentId}")
//    public Comment updateComment(@PathVariable Long movieId,
//                                 @PathVariable Long commentId,
//                                 @RequestBody Comment comment) {
//        return service.updateComment(commentId, comment);
//    }
//
//    @DeleteMapping("/{commentId}")
//    public ResponseEntity<?> deleteComment(@PathVariable Long movieId,
//                                           @PathVariable Long commentId,
//                                           @RequestParam String password) {
//        Comment c = service.getComments(movieId).stream()
//                .filter(cm -> cm.getId().equals(commentId))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Not found"));
//
//        if (!c.getPassword().equals(password)) {
//            return ResponseEntity.status(403).body("Wrong password");
//        }
//
//        service.deleteComment(commentId);
//        return ResponseEntity.ok().build();
//    }
//}
