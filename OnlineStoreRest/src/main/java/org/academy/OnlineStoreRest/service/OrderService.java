package org.academy.OnlineStoreRest.service;


import org.academy.OnlineStoreRest.dto.CardDto;
import org.academy.OnlineStoreRest.dto.OrderDto;
import org.academy.OnlineStoreRest.dto.UserDto;

import java.util.List;

public interface OrderService {
    //    void saveProductToOrder(User user, Product product);
    OrderDto findById(Integer id);

    OrderDto createOrderIfNotActive(UserDto userDto);

    void payOrder(OrderDto orderDto, CardDto cardDto);

    List<OrderDto> findAll();


    void setDelivered(OrderDto orderDto);
}
