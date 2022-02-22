package org.academy.OnlineStoreRest.service;

import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.form.UserForm;
import org.academy.OnlineStoreRest.model.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    UserDto create(UserForm userForm);

    void update(UserForm userForm, UserDto userDto);

    void update(UserDto userDto);

    UserDto findByLogin(String login);

    User findByEmail(String email);

    UserDto findByPhoneNumber(String phoneNumber);

    List<UserDto> findAll();

    UserDto findById(Integer id);

    void toBan(Integer id);

    void unBan(Integer id);

    UserDto setDelete(String login);

    UserDto setActive(String login);

    Boolean existsUserByEmail(String email);

    Boolean existsUserByLogin(String login);

    Boolean existsUserByPhoneNumber(String phoneNumber);

    UserDto savePhoto(MultipartFile file, UserDto userDto );

    UserDto deletePhoto(Integer id);
}
