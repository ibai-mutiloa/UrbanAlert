package edu.mondragon.we2.rest_crime.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.mondragon.we2.rest_crime.model.CrimeData;
import edu.mondragon.we2.rest_crime.model.CrimeDataRepository;
import edu.mondragon.we2.rest_crime.service.CrimeService;

@RestController
@RequestMapping("/crimeservice")
public class CrimeController {

    @Autowired
    private CrimeDataRepository crimeRepository;

    @Autowired
    private CrimeService crimeService;  // Inyectamos el servicio

    @GetMapping(value = "/all", produces = { "application/json", "application/xml" })
    public ResponseEntity<List<CrimeData>> getAllCrimes() {
        List<CrimeData> crimeList = crimeRepository.findAll();
        if (crimeList.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(crimeList, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/byCategory", produces = { "application/json", "application/xml" })
    public ResponseEntity<List<CrimeData>> getCrimesByCategory(@RequestParam String category) {
        List<CrimeData> crimes = crimeRepository.findByCategory(category);
        if (crimes.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(crimes, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/byMonth", produces = { "application/json", "application/xml" })
    public ResponseEntity<List<CrimeData>> getCrimesByMonth(@RequestParam String month) {
        List<CrimeData> crimes = crimeRepository.findByMonth(month);
        if (crimes.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(crimes, HttpStatus.OK);
        }
    }

    @PostMapping(value = "/add", consumes = { "application/json", "application/xml" }, produces = {
            "application/json", "application/xml" })
    public ResponseEntity<CrimeData> addCrime(@RequestBody CrimeData crime) {
        // Usar el servicio para agregar el crimen con ID secuencial
        CrimeData savedCrime = crimeService.addCrime(crime);
        return new ResponseEntity<>(savedCrime, HttpStatus.CREATED);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<CrimeData> updateCrime(@PathVariable long id, @RequestBody CrimeData crime) {
        Optional<CrimeData> found = crimeRepository.findById(id);
        if (found.isPresent()) {
            CrimeData existing = found.get();
            existing.setCategory(crime.getCategory());
            existing.setMonth(crime.getMonth());
            existing.setContext(crime.getContext());
            existing.setLocationType(crime.getLocationType());
            existing.setLatitude(crime.getLatitude());
            existing.setLongitude(crime.getLongitude());
            existing.setStreetId(crime.getStreetId());
            existing.setStreetName(crime.getStreetName());
            existing.setPersistentId(crime.getPersistentId());
            existing.setLocationSubtype(crime.getLocationSubtype());
            existing.setOutcomeCategory(crime.getOutcomeCategory());
            existing.setOutcomeDate(crime.getOutcomeDate());

            crimeRepository.save(existing);
            return new ResponseEntity<>(existing, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteCrime(@PathVariable long id) {
        Optional<CrimeData> found = crimeRepository.findById(id);
        if (found.isPresent()) {
            crimeRepository.delete(found.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
