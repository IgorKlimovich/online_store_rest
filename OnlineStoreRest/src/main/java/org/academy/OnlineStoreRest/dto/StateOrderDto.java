package org.academy.OnlineStoreRest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StateOrderDto {

    private Integer id;

    private String name;

    @JsonIgnore
    private List<OrderDto> ordersDto;
}
