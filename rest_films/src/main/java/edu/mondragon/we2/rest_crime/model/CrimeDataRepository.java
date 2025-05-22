package edu.mondragon.we2.rest_crime.model;

import java.util.List;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrimeDataRepository extends CassandraRepository<CrimeData, Long> {
    List<CrimeData> findByCategory(String category);
    List<CrimeData> findByMonth(String month);
}

