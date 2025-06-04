package edu.mondragon.we2.rest_crime.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.stereotype.Service;

import com.datastax.oss.driver.api.core.cql.SimpleStatement;

import edu.mondragon.we2.rest_crime.model.CrimeData;
import edu.mondragon.we2.rest_crime.model.CrimeDataRepository;

import java.util.Optional;

@Service
public class CrimeService {

    @Autowired
    private CrimeDataRepository crimeRepository;

    @Autowired
    private CassandraTemplate cassandraTemplate;

    public long getNextCrimeId() {
        // Crear la consulta SELECT con SimpleStatement
        var selectQuery = "SELECT last_id FROM crime_id_counter WHERE counter_name = 'crime'";
        SimpleStatement selectStmt = SimpleStatement.builder(selectQuery).build();

        Long lastId = Optional.ofNullable(cassandraTemplate.selectOne(selectStmt, Long.class))
                              .orElse(0L);
        long nextId = lastId + 1;

        // Crear la consulta UPDATE con parámetro usando SimpleStatement
        var updateQuery = "UPDATE crime_id_counter SET last_id = ? WHERE counter_name = 'crime'";
        SimpleStatement updateStmt = SimpleStatement.builder(updateQuery)
                                                   .addPositionalValue(nextId)
                                                   .build();

        cassandraTemplate.execute(updateStmt);

        return nextId;
    }

    public CrimeData addCrime(CrimeData crime) {
        long nextId = getNextCrimeId();
        crime.setId(nextId);
        return crimeRepository.save(crime);
    }

    // Otros métodos para update, delete, etc.
}
