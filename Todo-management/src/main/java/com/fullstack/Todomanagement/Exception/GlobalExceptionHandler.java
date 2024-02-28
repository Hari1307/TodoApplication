package com.fullstack.Todomanagement.Exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(TodoApiException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(TodoApiException exception, WebRequest webRequest) {
        ErrorDetails error = new ErrorDetails(LocalTime.now(), exception.getMessage(), exception.getStatus().toString());
        return new ResponseEntity<>(error, exception.getStatus());
    }
}
