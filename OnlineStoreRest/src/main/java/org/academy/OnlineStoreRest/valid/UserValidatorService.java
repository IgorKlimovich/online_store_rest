package org.academy.OnlineStoreRest.valid;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.form.LoginForm;
import org.academy.OnlineStoreRest.form.UserForm;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class UserValidatorService {

    private final UserService userService;

    public Response validateUser(UserForm userForm) {
        String message = null;
        if (userService.existsUserByLogin(userForm.getLogin())) {
            message = "login is already exist";
        }
        if (userService.existsUserByEmail(userForm.getEmail())) {
            message = "email is already exist";
        }
        if (userService.existsUserByPhoneNumber(userForm.getPhoneNumber())) {
            message = "phone number is already exist";
        }
        return new Response(message, HttpStatus.OK, LocalDateTime.now());
    }

    public Response validateUpdateUser(UserForm userForm) {
        String message = null;
        List<UserDto> usersDto = userService.findAll();
        UserDto userDto = userService.findById(userForm.getId());
        usersDto.remove(userDto);
        if (usersDto.stream().anyMatch(user -> user.getEmail().equals(userForm.getEmail()))) {
            message = "email is already exist";
        }
        if (usersDto.stream().anyMatch(user -> user.getPhoneNumber().equals(userForm.getPhoneNumber()))) {
            message = "phone number is already exist";
        }
        if (usersDto.stream().anyMatch(user->user.getLogin().equals(userForm.getLogin()))){
            message= "login is already exist";
        }
        System.out.println(message);
        return new Response(message, HttpStatus.OK, LocalDateTime.now());
    }
}

