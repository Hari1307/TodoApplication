package com.fullstack.Todomanagement.controller;

import com.fullstack.Todomanagement.dto.JwtAuthResponse;
import com.fullstack.Todomanagement.dto.LoginDto;
import com.fullstack.Todomanagement.dto.RegisterDto;
import com.fullstack.Todomanagement.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin("http://127.0.0.1:4000/")
public class AuthController {
    private AuthService authService;

//    Register Api

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerDto) {
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<>(authService.login(loginDto), HttpStatus.OK);
    }

//    @ExceptionHandler(TodoApiException.class)
//    public ResponseEntity<String> handleResourceNotFoundException(TodoApiException ex) {
//        return new ResponseEntity<>(ex.getMessage(), ex.getStatus());
//    }
}
