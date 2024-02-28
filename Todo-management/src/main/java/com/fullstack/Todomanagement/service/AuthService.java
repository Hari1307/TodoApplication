package com.fullstack.Todomanagement.service;

import com.fullstack.Todomanagement.dto.JwtAuthResponse;
import com.fullstack.Todomanagement.dto.LoginDto;
import com.fullstack.Todomanagement.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
