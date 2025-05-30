package edu.mondragon.we2.rest_crime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "edu.mondragon.we2.rest_crime")
public class RestCrimeApplication {
    public static void main(String[] args) {
        SpringApplication.run(RestCrimeApplication.class, args);
    }
}

