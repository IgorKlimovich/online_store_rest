package org.academy.OnlineStoreRest.controller;

import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.service.ProductService;
import org.academy.OnlineStoreRest.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private final UserService userService;
    private final ProductService productService;

    public AdminController(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer id){
        UserDto userDto =userService.findById(id);
        if (userDto==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }
    @GetMapping("/products")
    @CrossOrigin("*")
    public ResponseEntity<List<ProductDto>> getProducts(){
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/products/{id}")
    public ProductDto getOne(@PathVariable("id")Integer id){
        System.out.println(productService.findById(id));
        return productService.findById(id);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getUsers(){
        return ResponseEntity.ok(userService.findAll());
    }
}
