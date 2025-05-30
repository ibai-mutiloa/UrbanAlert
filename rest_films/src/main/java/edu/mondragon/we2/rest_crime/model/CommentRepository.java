package edu.mondragon.we2.rest_crime.model;

import edu.mondragon.we2.rest_crime.model.Comment;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentRepository extends CassandraRepository<Comment, UUID> {
    // Puedes agregar métodos personalizados si quieres
}
