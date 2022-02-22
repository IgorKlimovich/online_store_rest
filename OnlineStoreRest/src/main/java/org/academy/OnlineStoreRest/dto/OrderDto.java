package org.academy.OnlineStoreRest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Integer id;

    private Date date;

    private Double fullPrice;

    private UserDto userDto;

//    @JsonIgnore
    private StateOrderDto stateOrderDto;

//    private String stateOrderDtoName;

//    @JsonIgnore
    private List<OrderProductDto> orderProductsDto ;

    @Override
    public String toString() {
        return "OrderDto{" +
                "id=" + id +
                ", date=" + date +
                ", fullPrice=" + fullPrice +
                ", userDto name=" + userDto.getFirstName() +
                ", stateOrderDto name=" + stateOrderDto.getName() +
                '}';
    }
}
