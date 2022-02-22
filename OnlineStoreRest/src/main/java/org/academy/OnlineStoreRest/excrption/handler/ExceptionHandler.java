package org.academy.OnlineStoreRest.excrption.handler;

import org.academy.OnlineStoreRest.excrption.LoginExistException;
import org.academy.OnlineStoreRest.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(LoginExistException.class)
    public ResponseEntity<Response> loginExistHandler(LoginExistException ex){
        Response errorResponse = new Response(ex.getMessage(),HttpStatus.OK,LocalDateTime.now());
        return  new ResponseEntity<>(errorResponse,HttpStatus.OK);
    }
    @org.springframework.web.bind.annotation.ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Response> loginHandler(AuthenticationException ex){
        System.out.println(ex.getMessage());
        Response errorResponse = new Response(ex.getMessage(),HttpStatus.OK,LocalDateTime.now());
        return  new ResponseEntity<>(errorResponse,HttpStatus.OK);
    }
}

