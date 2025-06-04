package edu.mondragon.we2.rest_crime.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Inyectamos RestTemplate vía constructor
    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public double[] geocode(String street, String city, String country) {
        String address = street + ", " + city + ", " + country;

        var url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("q", address)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .build()
                .toUriString();

        try {
            var headers = new HttpHeaders();
            headers.set("User-Agent", "MiApp/1.0 (contacto@ejemplo.com)");  // IMPORTANTE: pon aquí tu user-agent válido

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            JsonNode results = objectMapper.readTree(response.getBody());

            if (results.isArray() && results.size() > 0) {
                JsonNode obj = results.get(0);
                var lat = obj.get("lat").asDouble();
                var lon = obj.get("lon").asDouble();
                return new double[]{lat, lon};
            }
        } catch (Exception e) {
            System.err.println("Error geocoding: " + e.getMessage());
        }

        return new double[0];

    }
}
