package edu.mondragon.we2.rest_crime.model;

public class CrimeData {
    private String category;
    private String location_type;
    private Location location;
    private String context;
    private Object outcome_status; // Use a specific class if needed
    private String persistent_id;
    private long id;
    private String location_subtype;
    private String month;

    // Inner class for Location
    public static class Location {
        private String latitude;
        private String longitude;
        private Street street;

        // Getters and Setters

        public String getLatitude() {
            return latitude;
        }

        public void setLatitude(String latitude) {
            this.latitude = latitude;
        }

        public String getLongitude() {
            return longitude;
        }

        public void setLongitude(String longitude) {
            this.longitude = longitude;
        }

        public Street getStreet() {
            return street;
        }

        public void setStreet(Street street) {
            this.street = street;
        }
    }

    // Inner class for Street
    public static class Street {
        private int id;
        private String name;

        // Getters and Setters

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    // Getters and setters for CrimeData fields

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation_type() {
        return location_type;
    }

    public void setLocation_type(String location_type) {
        this.location_type = location_type;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Object getOutcome_status() {
        return outcome_status;
    }

    public void setOutcome_status(Object outcome_status) {
        this.outcome_status = outcome_status;
    }

    public String getPersistent_id() {
        return persistent_id;
    }

    public void setPersistent_id(String persistent_id) {
        this.persistent_id = persistent_id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLocation_subtype() {
        return location_subtype;
    }

    public void setLocation_subtype(String location_subtype) {
        this.location_subtype = location_subtype;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }
}
