package edu.mondragon.we2.rest_crime.controller;

import edu.mondragon.we2.rest_crime.model.Comment;
import edu.mondragon.we2.rest_crime.service.GeocodingService;  // IMPORTAR el servicio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private edu.mondragon.we2.rest_crime.model.CommentRepository commentRepository;

    @Autowired
    private GeocodingService geocodingService;  // Inyectar el servicio

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        try {
            System.out.println("Recibido comentario:");
            System.out.println(comment);

            if (comment.getLatitude() == null || comment.getLongitude() == null) {
                double[] coords = geocodingService.geocode(
                    comment.getStreet(),
                    comment.getCity(),
                    comment.getCountry()
                );
                if (coords != null && coords.length == 2) {
                    comment.setLatitude(coords[0]);
                    comment.setLongitude(coords[1]);
                } else {
                    System.err.println("No se pudieron calcular coordenadas.");
                }
            }

            Comment saved = commentRepository.save(comment);
            System.out.println("Comentario guardado con ID: " + saved.getId());
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            System.err.println("Error al guardar comentario: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error en el backend");
        }
    }


    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable UUID id) {
        Optional<Comment> comment = commentRepository.findById(id);
        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable UUID id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
