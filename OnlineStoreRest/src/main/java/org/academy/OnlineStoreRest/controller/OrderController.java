package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.CardDto;
import org.academy.OnlineStoreRest.dto.OrderDto;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.CardService;
import org.academy.OnlineStoreRest.service.OrderProductService;
import org.academy.OnlineStoreRest.service.OrderService;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.valid.CardValidatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/orders")
@AllArgsConstructor
@CrossOrigin("*")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final OrderProductService orderProductService;
    private final CardService cardService;
    private final CardValidatorService cardValidatorService;

    @GetMapping
    public ResponseEntity getOrders(Authentication authentication){
        UserDto userDto = userService.findByLogin(authentication.getName());
//        System.out.println(authentication.getName());
        List<OrderDto> ordersDto = userDto.getOrdersDto();
        return ResponseEntity.ok(ordersDto);
    }

    @PostMapping("/add")
    public ResponseEntity addProductToOrder(@RequestBody ProductDto productDto, Authentication authentication) {
        UserDto userDto = userService.findByLogin(authentication.getName());
        System.out.println("---------------------------------");
        System.out.println(productDto);
      OrderDto orderDto = orderService.createOrderIfNotActive(userDto);

//        ProductDto productDto = productService.findById(productId);
//        if (Boolean.FALSE.equals(productDto.getIsExist())) {
//            model.addAttribute(ERROR, PRODUCT_NOT_EXIST)
//                    .addAttribute(PRODUCT_DTO, productDto)
//                    .addAttribute(USER_PROF, userDto);
//            log.warn("in add product to order: product {} not exist", productDto);
//            return PRODUCT;
//        }
//
        orderProductService.saveProductToOrder(orderDto, productDto);
//        ProductDto productDtoAfterSave = productService.findById(productId);
//        model.addAttribute(PRODUCT_DTO, productDtoAfterSave)
//                .addAttribute(ERROR, PRODUCT_EXIST)
//                .addAttribute(USER_PROF, userDto);
//        log.info("in add product to order: product {} added to order {} for user {}", productDto, orderDto, userDto);
//        return PRODUCT;
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne (@PathVariable("id") Integer id){
        OrderDto orderDto = orderService.findById(id);
        return ResponseEntity.ok(orderDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteProductFromOrder(@PathVariable  Integer id){
        orderProductService.removeProductFromOrder(id);
        return ResponseEntity.ok(id);
    }

    @PostMapping("/pay")
    public ResponseEntity payOrder (@RequestBody String cardNumber, Authentication authentication){

        UserDto userDto = userService.findByLogin(authentication.getName());
        Response response = cardValidatorService.validateExistCard(cardNumber,userDto);
        if (response.getMessage()!=null){
            return ResponseEntity.ok(response);
        }
        OrderDto orderDto = orderService.createOrderIfNotActive(userDto);
        CardDto cardDto = userDto.getCardsDto().stream().filter(card->card.getNumber().equals(cardNumber)).findAny().get();
        orderService.payOrder(orderDto, cardDto);
        System.out.println(cardDto);
        return ResponseEntity.ok(orderDto);
    }
}
