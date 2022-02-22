package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.excrption.LoginExistException;
import org.academy.OnlineStoreRest.form.UserForm;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.valid.UserValidatorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@CrossOrigin("*")
@AllArgsConstructor
public class RegisterController {

    private final UserService userService;

    private final UserValidatorService userValidatorService;



    @PostMapping
    public ResponseEntity register(@RequestBody UserForm userForm){
        Response response = userValidatorService.validateUser(userForm);
        if (response.getMessage()!=null){
          return  ResponseEntity.ok(response);
        }
       UserDto userAfterSave= userService.create(userForm);

        return ResponseEntity.ok(userAfterSave);
    }

}
