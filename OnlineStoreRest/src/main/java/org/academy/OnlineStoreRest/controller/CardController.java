package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.CardDto;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.security.details.JwtTokenProvider;
import org.academy.OnlineStoreRest.service.CardService;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.valid.CardValidatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/cards")
@CrossOrigin("*")
@AllArgsConstructor
public class CardController {

    private final CardService cardService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final CardValidatorService cardValidatorService;

    @PostMapping
    public ResponseEntity addCard(@RequestBody CardDto cardDto, HttpServletRequest httpServletRequest){
        String token = httpServletRequest.getHeader("Authorization");
        String login = jwtTokenProvider.getLogin(token.substring(7));
        UserDto userDto = userService.findByLogin(login);
        Response response = cardValidatorService.validateCard(cardDto,userDto);
        if (response.getMessage()!=null){
            return ResponseEntity.ok(response);
        }
        System.out.println(login);
        System.out.println(cardDto);
        CardDto cardDtoAfterSave= cardService.save(cardDto, userDto);
        return ResponseEntity.ok(cardDtoAfterSave);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCard(@PathVariable Integer id){
        System.out.println(id);
        cardService.remove(id);
        return  ResponseEntity.ok(id);
    }

    @PutMapping
    public ResponseEntity updateCard(@RequestBody CardDto cardDto, Authentication authentication){
        UserDto userDto = userService.findByLogin(authentication.getName());
        System.out.println(cardDto);
        Response response = cardValidatorService.validateExistUpdateCard(userDto, cardDto);
        if (response.getMessage()!=null){
            return ResponseEntity.ok(response);
        }
        CardDto cardAfterUpdate = cardService.update(cardDto);
        return ResponseEntity.ok(cardAfterUpdate);
    }
}
