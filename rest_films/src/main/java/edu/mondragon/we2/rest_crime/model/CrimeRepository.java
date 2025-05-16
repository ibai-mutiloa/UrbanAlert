package edu.mondragon.we2.rest_crime.model;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrimeRepository extends JpaRepository<CrimeData, Long> {
    List<CrimeData> findByCategory(String category);
    List<CrimeData> findByMonth(String month);
}
