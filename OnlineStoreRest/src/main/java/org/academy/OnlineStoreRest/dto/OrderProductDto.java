package org.academy.OnlineStoreRest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductDto {

    private Integer id;

    @JsonIgnore
    private OrderDto orderDto;

    private ProductDto productDto;

    private Double newProductPrice;

}
