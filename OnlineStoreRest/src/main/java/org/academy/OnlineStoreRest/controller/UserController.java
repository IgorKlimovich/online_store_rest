package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.form.LoginForm;
import org.academy.OnlineStoreRest.form.UserForm;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.security.details.JwtTokenProvider;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.valid.UserValidatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserValidatorService userValidatorService;

    @GetMapping("/user")
    public ResponseEntity<UserDto> getUser (HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        String login = jwtTokenProvider.getLogin(token.substring(7));
        UserDto userDto = userService.findByLogin(login);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/users/addPhoto")
    public ResponseEntity<UserDto> addPhoto(@RequestParam(name = "file", required = false)MultipartFile multipartFile,
                                   HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        String login = jwtTokenProvider.getLogin(token.substring(7));
        UserDto userDto = userService.findByLogin(login);
       UserDto userDtoAfterSave=userService.savePhoto(multipartFile,userDto);
        return ResponseEntity.ok(userDtoAfterSave);
    }

    @PostMapping("/users/deletePhoto")
    public ResponseEntity<UserDto> deletePhoto(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        String login = jwtTokenProvider.getLogin(token.substring(7));
        UserDto userDto = userService.findByLogin(login);
        UserDto userDtoAfterSave=userService.deletePhoto(userDto.getId());
        return ResponseEntity.ok(userDtoAfterSave);
    }

    @PostMapping("/users/delete")
    public ResponseEntity<UserDto> deleteUser(HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        String login = jwtTokenProvider.getLogin(token.substring(7));
        UserDto userDto = userService.findByLogin(login);
     UserDto userDtoAfterSave=userService.setDelete(userDto.getLogin());

        return ResponseEntity.ok(userDtoAfterSave);
    }

    @PostMapping("/users/restore")
    public ResponseEntity<UserDto> restoreUser(@RequestBody LoginForm loginForm){
        UserDto userDto = userService.findByLogin(loginForm.getLogin());
        UserDto userDtoAfterSave=userService.setActive(userDto.getLogin());
        return ResponseEntity.ok(userDtoAfterSave);
    }

    @PutMapping("/users")
    public ResponseEntity updateUser(@RequestBody UserForm userForm, Authentication authentication){
        System.out.println(userForm);
        System.out.println(authentication);
       UserDto userDto = userService.findByLogin(authentication.getName());
        Response response = userValidatorService.validateUpdateUser(userForm);
        if (response.getMessage()!=null){
            return ResponseEntity.ok(response);
        }
       userService.update(userForm, userDto);

        return ResponseEntity.ok(userForm);
    }
}
