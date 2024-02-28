package com.fullstack.Todomanagement.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class TodoApiException extends RuntimeException {
    private HttpStatus status;
    private String message;
}
