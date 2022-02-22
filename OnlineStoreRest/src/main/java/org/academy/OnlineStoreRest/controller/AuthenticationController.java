package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.form.LoginForm;
import org.academy.OnlineStoreRest.model.entity.User;
import org.academy.OnlineStoreRest.security.details.JwtTokenProvider;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.valid.UserValidatorService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
//@RequestMapping("/login")
@AllArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final UserValidatorService userValidatorService;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginForm loginForm){
        System.out.println(loginForm);
            String login = loginForm.getLogin();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login,loginForm.getPassword()));

            UserDto userDto=userService.findByLogin(login);
            User user = modelMapper.map(userDto, User.class);
            String token = jwtTokenProvider.createToken(login,user.getRole());
            Map<Object,Object> response= new HashMap<>();
            response.put("login", login);
            response.put("token", token);
            return ResponseEntity.ok(response);
    }

    @GetMapping("/auth")
    public ResponseEntity verify (HttpServletRequest request){
        Map<Object,Object> response= new HashMap<>();
        String token = request.getHeader("Authorization");
        System.out.println(token);
        if (jwtTokenProvider.validateToken(token)){
            System.out.println(token);
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        System.out.println(token);
        System.out.println("ffff");
        return ResponseEntity.ok(response);
    }

}
