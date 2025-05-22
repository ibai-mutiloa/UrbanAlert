package edu.mondragon.we2.rest_crime.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleInvalidFormatException(InvalidFormatException ex) {
        return ResponseEntity.badRequest().body("Formato inválido: " + ex.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        return ResponseEntity.badRequest().body("Validación fallida: " + ex.getMessage());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error inesperado: " + ex.getMessage());
    }
}
