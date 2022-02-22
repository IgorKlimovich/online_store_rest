package org.academy.OnlineStoreRest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategoryDto {

    private Integer id;

    private String name;

    private Integer amount;

    @JsonIgnore
    private List<ProductDto> productsDto;
}
