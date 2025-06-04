package edu.mondragon.we2.rest_crime.model;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("crime")
public class CrimeData {

    @PrimaryKey
    private long id;

    private String category;
    private String context;
    private Double latitude;
    private Double longitude;

    public CrimeData() {
        throw new UnsupportedOperationException("Constructor hutsa");
    }

    @Column("street_id")
    private Long streetId;

    @Column("street_name")
    private String streetName;

    @Column("location_type")
    private String locationType;

    @Column("location_subtype")
    private String locationSubtype;

    @Column("outcome_category")
    private String outcomeCategory;

    @Column("outcome_date")
    private String outcomeDate;

    private String month;

    @Column("persistent_id")
    private String persistentId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
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

    public Long getStreetId() {
        return streetId;
    }

    public void setStreetId(Long streetId) {
        this.streetId = streetId;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public String getLocationSubtype() {
        return locationSubtype;
    }

    public void setLocationSubtype(String locationSubtype) {
        this.locationSubtype = locationSubtype;
    }

    public String getOutcomeCategory() {
        return outcomeCategory;
    }

    public void setOutcomeCategory(String outcomeCategory) {
        this.outcomeCategory = outcomeCategory;
    }

    public String getOutcomeDate() {
        return outcomeDate;
    }

    public void setOutcomeDate(String outcomeDate) {
        this.outcomeDate = outcomeDate;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getPersistentId() {
        return persistentId;
    }

    public void setPersistentId(String persistentId) {
        this.persistentId = persistentId;
    }
}
