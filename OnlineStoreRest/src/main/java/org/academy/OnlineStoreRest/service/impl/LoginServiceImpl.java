package org.academy.OnlineStoreRest.service.impl;

import org.academy.OnlineStoreRest.dto.TokenDto;
import org.academy.OnlineStoreRest.form.LoginForm;
import org.academy.OnlineStoreRest.model.entity.Token;
import org.academy.OnlineStoreRest.model.entity.User;
import org.academy.OnlineStoreRest.model.repository.TokenRepository;
import org.academy.OnlineStoreRest.model.repository.UserRepository;
import org.academy.OnlineStoreRest.service.LoginService;
import org.apache.commons.lang3.RandomStringUtils;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {

    private final TokenRepository tokenRepository;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final ModelMapper modelMapper;

    public LoginServiceImpl(TokenRepository tokenRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ModelMapper modelMapper) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.modelMapper = modelMapper;
    }



    @Override
    public TokenDto login(LoginForm loginForm) {
        System.out.println("hereererre");
        Optional<User> optionalUser = userRepository.findUserByLogin(loginForm.getLogin());
        if (optionalUser.isPresent()){
            User user= optionalUser.get();
            if (bCryptPasswordEncoder.matches(loginForm.getPassword(),user.getPassword())){
                Token token = new Token();
                token.setUser(user);
                token.setValue(RandomStringUtils.random(10));
                tokenRepository.save(token);
                return modelMapper.map(token,TokenDto.class);
            }
        }
        throw new IllegalArgumentException("UserNotFound");
    }
}
