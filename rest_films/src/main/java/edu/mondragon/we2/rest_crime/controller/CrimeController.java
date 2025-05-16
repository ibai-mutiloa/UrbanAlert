package edu.mondragon.we2.rest_crime.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.mondragon.we2.rest_crime.model.CrimeData;
import edu.mondragon.we2.rest_crime.model.CrimeRepository;

@RestController
@RequestMapping("/crimeservice")
public class CrimeController {

    @Autowired
    CrimeRepository crimeRepository;

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
        Optional<CrimeData> found = crimeRepository.findById(crime.getId());
        if (found.isPresent()) {
            return ResponseEntity.badRequest().build();
        } else {
            crimeRepository.save(crime);
            return new ResponseEntity<>(crime, HttpStatus.CREATED);
        }
    }

    @PutMapping(value = "/update/{id}", consumes = { "application/json", "application/xml" }, produces = {
            "application/json", "application/xml" })
    public ResponseEntity<CrimeData> updateCrime(@PathVariable Long id, @RequestBody CrimeData crime) {
        Optional<CrimeData> found = crimeRepository.findById(id);
        if (found.isPresent()) {
            CrimeData existing = found.get();
            existing.setCategory(crime.getCategory());
            existing.setMonth(crime.getMonth());
            existing.setContext(crime.getContext());
            existing.setLocation(crime.getLocation());
            existing.setLocation(crime.getLocation());
            existing.setPersistent_id(crime.getPersistent_id());
            existing.setLocation(crime.getLocation());
            existing.setOutcome_status(crime.getOutcome_status());
            crimeRepository.save(existing);
            return new ResponseEntity<>(existing, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Void> deleteCrime(@PathVariable Long id) {
        Optional<CrimeData> found = crimeRepository.findById(id);
        if (found.isPresent()) {
            crimeRepository.delete(found.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
