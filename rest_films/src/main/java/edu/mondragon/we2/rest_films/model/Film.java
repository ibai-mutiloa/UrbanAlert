package edu.mondragon.we2.rest_films.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "film")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    int filmID;
    String filmTitle;
    int filmYear;
    String filmGenre;
    int filmDuration;
    String filmCountry;
    String filmDirector;

    public Film(){

    }

    
    public Film(int filmID, String filmTitle, int filmYear, String filmGenre, int filmDuration,
            String filmCountry, String filmDirector) {
        this.filmID = filmID;
        this.filmTitle = filmTitle;
        this.filmYear = filmYear;
        this.filmGenre = filmGenre;
        this.filmDuration = filmDuration;
        this.filmCountry = filmCountry;
        this.filmDirector = filmDirector;
    }

    public Film(String filmTitle, int filmYear, String filmGenre, int filmDuration,
            String filmCountry, String filmDirector) {
        
        this.filmTitle = filmTitle;
        this.filmYear = filmYear;
        this.filmGenre = filmGenre;
        this.filmDuration = filmDuration;
        this.filmCountry = filmCountry;
        this.filmDirector = filmDirector;
    }

    public int getFilmID() {
        return filmID;
    }
    public void setFilmID(int filmID) {
        this.filmID = filmID;
    }
    public String getFilmTitle() {
        return filmTitle;
    }
    public void setFilmTitle(String filmTitle) {
        this.filmTitle = filmTitle;
    }
    
    public String getFilmCountry() {
        return filmCountry;
    }
    public void setFilmCountry(String filmCountry) {
        this.filmCountry = filmCountry;
    }


    public int getFilmYear() {
        return filmYear;
    }


    public void setFilmYear(int filmYear) {
        this.filmYear = filmYear;
    }


    public String getFilmGenre() {
        return filmGenre;
    }


    public void setFilmGenre(String filmGenre) {
        this.filmGenre = filmGenre;
    }


    public int getFilmDuration() {
        return filmDuration;
    }


    public void setFilmDuration(int filmDuration) {
        this.filmDuration = filmDuration;
    }


    public String getFilmDirector() {
        return filmDirector;
    }


    public void setFilmDirector(String filmDirector) {
        this.filmDirector = filmDirector;
    }


    
    
}
