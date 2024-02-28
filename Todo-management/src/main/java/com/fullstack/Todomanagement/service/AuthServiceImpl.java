package com.fullstack.Todomanagement.service;

import com.fullstack.Todomanagement.Exception.TodoApiException;
import com.fullstack.Todomanagement.dto.JwtAuthResponse;
import com.fullstack.Todomanagement.dto.LoginDto;
import com.fullstack.Todomanagement.dto.RegisterDto;
import com.fullstack.Todomanagement.modal.Role;
import com.fullstack.Todomanagement.modal.User;
import com.fullstack.Todomanagement.repository.RoleRepository;
import com.fullstack.Todomanagement.repository.UserRepository;
import com.fullstack.Todomanagement.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {
//        here checking whether username is already exist or not
        if (userRepository.existsByUserName(registerDto.getUserName())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "userName already exist");
        }

//        check email is already exist or not
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Email Already exist");
        }

//        here we are setting the role as normal user for all the users that we gonna create through this register
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("ROLE_USER");
        roles.add(role);

        User user = User.builder()
                .name(registerDto.getName())
                .email(registerDto.getEmail())
                .userName(registerDto.getUserName())
                .roles(roles)
                .password(passwordEncoder.encode(registerDto.getPassword())).build();

//        saving the user in user table
        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUserNameOrEmail(), loginDto.getPassword()));
        String jwtToken = jwtTokenProvider.generateToken(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Optional<User> user = userRepository.findByUserNameOrEmail(loginDto.getUserNameOrEmail(), loginDto.getUserNameOrEmail());
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        if (user.isPresent()) {
            User loggedInUser = user.get();
            Optional<Role> role = loggedInUser.getRoles().stream().findFirst();
            if (role.isPresent())
                jwtAuthResponse.setRole(role.get().getName());
        }
        jwtAuthResponse.setAccessToken(jwtToken);
        return jwtAuthResponse; //"User Logged in successfully";
    }
}
