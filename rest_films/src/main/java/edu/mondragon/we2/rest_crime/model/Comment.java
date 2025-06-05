package edu.mondragon.we2.rest_crime.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table("comment")
public class Comment {

    @PrimaryKey
    private UUID id = UUID.randomUUID();

    private String country;
    private String city;
    private String street;
    private Double latitude;
    private Double longitude;
    @Column("postal_code")
    private String postalCode;
    @Column("crime_type")
    private String crimeType;
    private String date;
    @Column("comment")
    private String text;
    private int rating;

    public Comment() {
    }

    // Getters y setters para todos los campos

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCrimeType() {
        return crimeType;
    }

    public void setCrimeType(String crimeType) {
        this.crimeType = crimeType;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    @Override
public String toString() {
    return "Comment{" +
            "id=" + id +
            ", country='" + country + '\'' +
            ", city='" + city + '\'' +
            ", street='" + street + '\'' +
            ", postalCode='" + postalCode + '\'' +
            ", crimeType='" + crimeType + '\'' +
            ", date='" + date + '\'' +
            ", text='" + text + '\'' +
            ", rating=" + rating +
            ", latitude=" + latitude +
            ", longitude=" + longitude +
            '}';
}

}
