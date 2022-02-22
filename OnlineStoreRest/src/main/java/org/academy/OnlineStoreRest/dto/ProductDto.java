package org.academy.OnlineStoreRest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Integer id;

    @NotEmpty(message = "product name can not be empty")
    private String name;

    private String description;

    private Boolean isExist;

    private Double price;

    private Integer amount;

    private String namePhoto;

    @JsonIgnore
    private ProductCategoryDto productCategoryDto;

    private String productCategoryName;

    @JsonIgnore
    private List<OrderProductDto> orderProductsDto;

    @Override
    public String toString() {
        return "ProductDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isExist=" + isExist +
                ", price=" + price +
                ", amount=" + amount +
                ", namePhoto='" + namePhoto + '\'' +
                ", productCategoryName='" + productCategoryName + '\'' +
                '}';
    }
}
