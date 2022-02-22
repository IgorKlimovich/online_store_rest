package org.academy.OnlineStoreRest.service;



import org.academy.OnlineStoreRest.dto.OrderDto;
import org.academy.OnlineStoreRest.dto.OrderProductDto;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.model.entity.OrderProduct;

import java.util.List;


public interface OrderProductService {
    void save(OrderProduct orderProduct);

    void removeProductFromOrder(Integer id);

    void saveProductToOrder(OrderDto orderDto, ProductDto productDto);

    List<OrderProductDto> findByOrderId(Integer id);
}
