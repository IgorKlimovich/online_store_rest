package org.academy.OnlineStoreRest.valid;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.ProductCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class ProductCategoryValidatorService {

    private final ProductCategoryService productCategoryService;

    public Response validateProductCategory (String productCategoryName){
        String message = null;
        if (productCategoryService.findByName(productCategoryName)==null){
            message = "Такой категории не найдено";
        }
        Response response = new Response(message, HttpStatus.OK, LocalDateTime.now());
        return response;
    }
}
