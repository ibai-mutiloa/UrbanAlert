package edu.mondragon.we2.rest_films.model;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmsRepository extends JpaRepository<Film, Integer>{
    Optional<Film> findByFilmTitle(String filmTitle);
    List<Film> findByFilmDirector(String filmDirector);
}
