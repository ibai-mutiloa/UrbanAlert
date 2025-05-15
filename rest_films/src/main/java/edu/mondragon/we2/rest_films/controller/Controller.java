package edu.mondragon.we2.rest_films.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import edu.mondragon.we2.rest_films.model.Film;

import edu.mondragon.we2.rest_films.model.FilmsRepository;
import jakarta.websocket.server.PathParam;


@RestController
@RequestMapping("/filmservice")
public class Controller {

    @Autowired
    FilmsRepository film_repository;

    /**
     * @brief This method returns the list of Filmss in XML and JSON format.
     * @return an HTTP response (OK if there are Filmss in the database, not found
     *         if there are
     *         not Filmss)
     */
    @GetMapping(value = "/show", produces = { "application/json", "application/xml" })
    @ResponseBody
    public ResponseEntity<List<Film>> getFilmss() {

        List<Film> Films_list = film_repository.findAll();

        if (Films_list.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(Films_list, HttpStatus.OK);
        }

    }

    /**
     * @brief This method returns the information about an Films in XML and JSON
     *        formats.
     * @param id identifier of the Films as query param.
     * @return an HTTP response (OK if the Films is found, not found if the
     *         Films does not exist in the database)
     */
    /*@GetMapping(value = "/select", produces = { "application/json", "application/xml" })
    public ResponseEntity<Film> getFilms(@RequestParam int id) {

        Optional<Film> Films = film_repository.findById(id);

        if (Films.isPresent()) {
            return new ResponseEntity<>(Films.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }

    }*/

    @GetMapping(value = "/filmsBydirector", produces = { "application/json", "application/xml" })
    public ResponseEntity<List<Film>> getFilmsByDirector(@RequestParam String director) {

        List<Film> films = film_repository.findByFilmDirector(director);

        if (films.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(films, HttpStatus.OK);
        }

    }

    @GetMapping(value = "/filmsByTitle", produces = { "application/json", "application/xml" })
    public ResponseEntity<Film> getFilmByTitle(@RequestParam String title) {

        Optional<Film> film = film_repository.findByFilmTitle(title);

        if (film.isPresent()) {
            return new ResponseEntity<>(film.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    /**
     * @brief This method adds a new Films to the database.
     * @param Films the Films object in XML or JSON format.
     * @return an HTTP response with an OK HTTP status.
     */
    @PostMapping(value = "/add", consumes = { "application/json", "application/xml" }, produces = {
            "application/json", "application/xml" })
    public ResponseEntity<Film> addFilm(@RequestBody Film film) {

        Optional<Film> found_Films = film_repository.findById(film.getFilmID());

        if (found_Films.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            film_repository.save(film);
            return new ResponseEntity<>(film, HttpStatus.CREATED);
        }

    }

    /**
     * @brief This method modifies the information about an Films stored in the
     *        database.
     * @param Films the Films object in XML or JSON format.
     * @return an HTTP response (OK if the Films is found, not found if the
     *         Films does not exist in the database)
     */
    @PutMapping(value = "/modify/{id}", consumes = { "application/json", "application/xml" }, produces = {
            "application/json", "application/xml" })
    public ResponseEntity<Film> putFilms(@PathVariable int id, @RequestBody Film film) {

        Optional<Film> found_Film = film_repository.findById(id);

        if (found_Film.isPresent()) {

            found_Film.get().setFilmTitle(film.getFilmTitle());
            found_Film.get().setFilmDuration(film.getFilmDuration());
            found_Film.get().setFilmDirector(film.getFilmDirector());
            found_Film.get().setFilmCountry(film.getFilmCountry());
            found_Film.get().setFilmGenre(film.getFilmGenre());
            found_Film.get().setFilmYear(film.getFilmYear());
            film_repository.save(found_Film.get());
            return new ResponseEntity<>(film, HttpStatus.OK);

        } else {
            return ResponseEntity.notFound().build();
        }

    }

    /**
     * @brief This method deletes an Films stored in the
     *        database.
     * @param id Films id specified in the path.
     * @return an HTTP response (OK if the Films is found, not found if the
     *         Films does not exist in the database)
     */
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Film> deleteFilm(@PathVariable int id) {

        Optional<Film> found_Films = film_repository.findById(id);

        if (found_Films.isPresent()) {

            film_repository.delete(found_Films.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    /**
     * @brief This method deletes an Films stored in the
     *        database.
     * @param id Films id specified as query param.
     * @return an HTTP response (OK if the Films is found, not found if the
     *         Films does not exist in the database)
     */
    /*@DeleteMapping(value = "/deleteFilmsRequestParam")
    public ResponseEntity<Film> deleteFilmsRequestParam(@RequestParam int id) {

        Optional<Film> found_Films = film_repository.findById(id);

        if (found_Films.isPresent()) {

            film_repository.delete(found_Films.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }*/


}


